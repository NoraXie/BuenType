import { useEffect, useMemo, useRef } from 'react';
import { useTypingStore } from '../../store/useTypingStore';
import { ArrowRight } from 'lucide-react'; // Using ArrowRight for next

export const ResultsScreen = () => {
    const {
        stats,
        text,
        errors,
        isFinished,
        updatePersistentStats,
        nextChapter
    } = useTypingStore();

    const hasUpdatedRef = useRef(false);

    const wrongWordsList = useMemo(() => {
        if (!isFinished) return [];

        const words = text.split(' ');
        let charIndex = 0;
        const failedWords: string[] = [];

        words.forEach((word) => {
            const wordStart = charIndex;
            const wordEnd = charIndex + word.length;
            const hasError = errors.some(idx => idx >= wordStart && idx < wordEnd);

            if (hasError) {
                // Keep raw word for counting, strip punct for display?
                // Store raw word might be better for uniqueness but "word." and "word" should be same?
                // Strip punctuation for matching:
                const cleanWord = word.replace(/[.,;:"'!?]/g, '').toLowerCase();
                if (cleanWord) failedWords.push(cleanWord);
            }

            charIndex = wordEnd + 1;
        });

        return failedWords;
    }, [text, errors, isFinished]);

    // Update persistence on mount of results screen
    useEffect(() => {
        if (isFinished && !hasUpdatedRef.current) {
            updatePersistentStats(stats.wpm, stats.accuracy, wrongWordsList);
            hasUpdatedRef.current = true;
        }
    }, [isFinished, stats.wpm, stats.accuracy, wrongWordsList, updatePersistentStats]);

    if (!isFinished) return null;

    return (
        <div className="fixed inset-0 z-40 bg-parchment flex flex-col items-center justify-center animate-in fade-in duration-500">
            <div className="text-center mb-12">
                <h1 className="text-6xl font-sans font-bold text-soft-charcoal mb-4">Results</h1>
                <p className="text-soft-charcoal/60 text-xl font-mono">Session Complete</p>
            </div>

            <div className="grid grid-cols-2 gap-16 mb-16 text-center">
                <div className="flex flex-col gap-2">
                    <span className="text-8xl font-bold text-soft-charcoal">{stats.wpm}</span>
                    <span className="text-sm font-bold uppercase tracking-widest text-soft-charcoal/40">WPM</span>
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-8xl font-bold text-soft-charcoal">{stats.accuracy}%</span>
                    <span className="text-sm font-bold uppercase tracking-widest text-soft-charcoal/40">Accuracy</span>
                </div>
                {/* Could add Error count or Time */}
            </div>

            {wrongWordsList.length > 0 && (
                <div className="mb-12 max-w-3xl w-full">
                    <h3 className="text-center font-bold text-soft-charcoal/60 mb-6 uppercase tracking-widest text-base">Difficult Words</h3>
                    <div className="flex flex-wrap justify-center gap-3">
                        {wrongWordsList.slice(0, 10).map((word, i) => (
                            <span key={i} className="px-4 py-2 bg-red-500/10 text-red-600 rounded-full text-lg font-medium">
                                {word}
                            </span>
                        ))}
                        {wrongWordsList.length > 10 && (
                            <span className="px-3 py-1 text-soft-charcoal/40 text-sm">+{wrongWordsList.length - 10} more</span>
                        )}
                    </div>
                </div>
            )}

            <div className="flex gap-6">
                <button
                    onClick={nextChapter}
                    className="flex items-center gap-2 px-8 py-4 bg-soft-charcoal text-parchment rounded-lg font-bold text-lg hover:bg-soft-charcoal/90 hover:scale-105 transition-all shadow-lg shadow-soft-charcoal/10"
                >
                    <ArrowRight size={24} />
                    Next Chapter
                </button>
                {/* Import logic is in Header usually, but maybe here too? */}
                {/* We can just show "Press Import in Header" or a shortcut? */}
            </div>
        </div>
    );
};
