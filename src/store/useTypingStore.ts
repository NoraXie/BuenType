import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { INITIAL_LIBRARY } from '../utils/libraryUtils';

// Default Book & Chapter
const defaultBook = INITIAL_LIBRARY[0];
const defaultChapter = defaultBook?.chapters[0];
const defaultText = defaultChapter?.content || "El veloz murciélago hindú comía feliz cardillo y kiwi.";
const defaultBookId = defaultBook?.id || null;
const defaultChapterId = defaultChapter?.id || null;

interface TypingStats {
    wpm: number;
    accuracy: number;
    errors: number;
    totalChars: number;
    startTime: number | null;
    endTime: number | null;
}

interface ChapterStats {
    lastAccuracy: number;
    wrongWords: string[]; // List of wrong words from the LAST attempt
}

interface PersistentStats {
    bestWpm: number;
    bestAccuracy: number;
    wrongWords: Record<string, number>; // Global accumulation (legacy?) -> User wants "wrong words" per chapter?
    // User quote: "每篇短文的准确率，错词库都要记录下来，永远只记录最后一次打字的准确率和错词库。"
    // So for each Chapter: Record last Accuracy + List of Wrong Words.
    libraryStats: Record<string, ChapterStats>; // keyed by chapterId (e.g. "humor_100-1")
}

interface TypingState {
    // Configuration
    isFocusMode: boolean;
    setFocusMode: (mode: boolean) => void;

    // Library Context
    currentBookId: string | null;
    currentChapterId: string | null;
    setChapter: (bookId: string, chapterId: string, text: string) => void;

    // Current Session
    text: string;
    currentIndex: number;
    errors: number[];
    isFinished: boolean;
    isActive: boolean;
    stats: TypingStats;
    consecutiveErrors: number;

    // Actions
    setText: (text: string) => void;
    startSession: () => void;
    endSession: () => void;
    handleKey: (key: string, expected: string, isBlocking?: boolean) => { correct: boolean; finished: boolean };
    handleBackspace: () => void;
    resetSession: () => void;

    // Persistent Data
    persistent: PersistentStats;
    updatePersistentStats: (wpm: number, accuracy: number, newWrongWords: string[]) => void;
    nextChapter: () => void;
}

export const useTypingStore = create<TypingState>()(
    persist(
        (set, get) => ({
            isFocusMode: false,
            setFocusMode: (mode) => set({ isFocusMode: mode }),

            currentBookId: defaultBookId,
            currentChapterId: defaultChapterId,
            consecutiveErrors: 0,
            setChapter: (bookId, chapterId, text) => set({
                currentBookId: bookId,
                currentChapterId: chapterId,
                text,
                currentIndex: 0,
                errors: [],
                isFinished: false,
                isActive: false,
                stats: { wpm: 0, accuracy: 100, errors: 0, totalChars: 0, startTime: null, endTime: null }
            }),

            text: defaultText,
            currentIndex: 0,
            errors: [],
            isFinished: false,
            isActive: false,
            stats: {
                wpm: 0,
                accuracy: 100,
                errors: 0,
                totalChars: 0,
                startTime: null,
                endTime: null,
            },

            persistent: {
                bestWpm: 0,
                bestAccuracy: 0,
                wrongWords: {},
                libraryStats: {}
            },

            setText: (text) => set({
                text,
                currentBookId: null, // Reset library context when importing custom text
                currentChapterId: null,
                currentIndex: 0,
                errors: [],
                isFinished: false,
                isActive: false,
                stats: { wpm: 0, accuracy: 100, errors: 0, totalChars: 0, startTime: null, endTime: null }
            }),

            startSession: () => set((state) => ({
                isActive: true,
                stats: { ...state.stats, startTime: Date.now() }
            })),

            endSession: () => {
                const state = get();
                const endTime = Date.now();
                const durationMin = (endTime - (state.stats.startTime || endTime)) / 60000;
                const wpm = Math.round((state.currentIndex / 5) / (durationMin || 1 / 60));
                set((state) => ({
                    isActive: false,
                    isFinished: true,
                    stats: { ...state.stats, endTime, wpm }
                }));
            },

            handleKey: (key, expected, isBlocking = false) => {
                const state = get();
                if (state.isFinished) return { correct: false, finished: true };

                if (!state.isActive) {
                    get().startSession();
                }

                // Normalize input key to handle smart quotes etc.
                const normalizeChar = (c: string) => {
                    return c
                        .replace(/[\u201C\u201D\u201E\u201F\u2033\u2036\u00AB\u00BB]/g, '"')
                        .replace(/[\u2018\u2019\u201A\u201B\u2032\u2035]/g, "'")
                        .replace(/[\u2013\u2014]/g, '-')
                        .replace(/\u00A0/g, ' ');
                };

                const isCorrect = normalizeChar(key) === normalizeChar(expected);
                const currentStats = state.stats;
                let newIndex = state.currentIndex;
                let newErrors = [...state.errors];
                let errorCount = currentStats.errors;

                if (isCorrect) {
                    newIndex = state.currentIndex + 1;
                } else {
                    errorCount += 1;
                    if (isBlocking) {
                        newIndex = state.currentIndex;
                    } else {
                        newErrors.push(state.currentIndex);
                        newIndex = state.currentIndex + 1;
                    }
                }

                const consecutiveErrors = isCorrect ? 0 : state.consecutiveErrors + 1;

                const totalTyped = currentStats.totalChars + 1;
                const accuracy = Math.round(((totalTyped - errorCount) / totalTyped) * 100);

                const now = Date.now();
                const durationMin = (now - (currentStats.startTime || now)) / 60000;
                const correctChars = newIndex - newErrors.length;
                const wpm = durationMin > 0 ? Math.round((correctChars / 5) / durationMin) : 0;

                set({
                    currentIndex: newIndex,
                    errors: newErrors,
                    stats: {
                        ...currentStats,
                        wpm: Math.max(0, wpm),
                        accuracy: Math.max(0, accuracy),
                        errors: errorCount,
                        totalChars: totalTyped,
                    },
                    consecutiveErrors
                });

                const finished = newIndex >= state.text.length;
                if (finished) {
                    get().endSession();
                }

                return { correct: isCorrect, finished };
            },

            handleBackspace: () => {
                set((state) => {
                    if (state.currentIndex === 0 || state.isFinished) return state;

                    const newIndex = state.currentIndex - 1;
                    const newErrors = state.errors.filter(e => e !== newIndex);

                    return {
                        currentIndex: newIndex,
                        errors: newErrors
                    };
                });
            },

            resetSession: () => set((_state) => ({
                currentIndex: 0,
                errors: [],
                isFinished: false,
                isActive: false,
                stats: {
                    wpm: 0,
                    accuracy: 100,
                    errors: 0,
                    totalChars: 0,
                    startTime: null,
                    endTime: null,
                }
            })),

            updatePersistentStats: (wpm, accuracy, newWrongWords) => set((state) => {
                // Global stats (legacy/aggregate)
                const updatedWrongWords = { ...state.persistent.wrongWords };
                newWrongWords.forEach(word => {
                    updatedWrongWords[word] = (updatedWrongWords[word] || 0) + 1;
                });

                // Library Stats (Chapter specific)
                const libraryStats = { ...state.persistent.libraryStats };
                if (state.currentChapterId) {
                    // Overwrite with LAST attempt
                    libraryStats[state.currentChapterId] = {
                        lastAccuracy: accuracy,
                        wrongWords: newWrongWords // Just the list for this session
                    };
                }

                return {
                    persistent: {
                        ...state.persistent,
                        bestWpm: Math.max(state.persistent.bestWpm, wpm),
                        bestAccuracy: Math.max(state.persistent.bestAccuracy, accuracy),
                        wrongWords: updatedWrongWords,
                        libraryStats
                    }
                };
            }),

            nextChapter: () => {
                const state = get();
                const currentBookId = state.currentBookId;
                const currentChapterId = state.currentChapterId;

                const book = INITIAL_LIBRARY.find(b => b.id === currentBookId);
                if (!book) return;

                const chapterIndex = book.chapters.findIndex(c => c.id === currentChapterId);
                // If chapter not found or it's the last one, loop to first? 
                // User requirement: "Next Article". 
                // If last, let's look for next book? Or just loop. 
                // Let's loop back to start of book for now as it's safe.

                let nextIndex = chapterIndex + 1;
                if (nextIndex >= book.chapters.length) {
                    nextIndex = 0; // Loop back
                }

                const nextChapter = book.chapters[nextIndex];
                get().setChapter(book.id, nextChapter.id, nextChapter.content);
            },
        }),
        {
            name: 'buentype-storage',
            partialize: (state) => ({ persistent: state.persistent, isFocusMode: state.isFocusMode }),
        }
    )
);
