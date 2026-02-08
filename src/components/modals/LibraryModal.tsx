import { useState } from 'react';
import { useTypingStore } from '../../store/useTypingStore';
import { Library, X, BookOpen, ChevronRight, CheckCircle2 } from 'lucide-react';
import { type Book, INITIAL_LIBRARY } from '../../utils/libraryUtils';
import clsx from 'clsx';

export const LibraryModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const {
        setChapter: setStoreChapter,
        persistent,
        currentChapterId
    } = useTypingStore();
    const [viewingStatsChapterId, setViewingStatsChapterId] = useState<string | null>(null);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);

    const handleChapterSelect = (chapter: any) => {
        if (!selectedBook) return;
        setStoreChapter(selectedBook.id, chapter.id, chapter.content);
        setIsOpen(false);
    };

    const getChapterStats = (chapterId: string) => {
        return persistent.libraryStats?.[chapterId];
    };

    const handleViewMissedWords = (e: React.MouseEvent, chapterId: string) => {
        e.stopPropagation(); // prevent chapter selection
        setViewingStatsChapterId(chapterId); // Now using state
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 text-soft-charcoal/60 hover:text-soft-charcoal transition-colors px-4 py-2 rounded font-sans text-sm font-medium"
            >
                <Library size={18} />
                Library
            </button>

            {/* Main Library Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">
                    <div className="bg-parchment border-2 border-soft-charcoal/10 shadow-xl rounded-lg w-full max-w-4xl h-[80vh] flex flex-col relative animate-in fade-in zoom-in-95 duration-200 overflow-hidden">

                        {/* Header */}
                        <div className="p-6 border-b border-soft-charcoal/10 flex justify-between items-center bg-white/30 backdrop-blur-md">
                            <div>
                                <h2 className="text-2xl font-bold font-sans text-soft-charcoal flex items-center gap-3">
                                    <Library className="text-soft-charcoal/60" />
                                    Spanish Library
                                </h2>
                                <p className="text-soft-charcoal/60 text-sm mt-1">Select a book and chapter to practice.</p>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 text-soft-charcoal/40 hover:text-soft-charcoal hover:bg-black/5 rounded-full transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-hidden flex">

                            {/* Book List (Sidebar) */}
                            <div className="w-1/3 border-r border-soft-charcoal/10 overflow-y-auto p-4 bg-soft-charcoal/5">
                                <h3 className="text-xs font-bold uppercase tracking-widest text-soft-charcoal/40 mb-4 px-2">Books</h3>
                                <div className="space-y-2">
                                    {INITIAL_LIBRARY.map((book) => (
                                        <button
                                            key={book.id}
                                            onClick={() => setSelectedBook(book)}
                                            className={clsx(
                                                "w-full text-left p-4 rounded-lg flex items-center gap-3 transition-all",
                                                selectedBook?.id === book.id
                                                    ? "bg-white shadow-sm ring-1 ring-soft-charcoal/10"
                                                    : "hover:bg-white/50"
                                            )}
                                        >
                                            <div className={clsx("w-10 h-12 rounded shadow-sm flex items-center justify-center text-soft-charcoal/40", book.coverColor)}>
                                                <BookOpen size={20} />
                                            </div>
                                            <div>
                                                <div className="font-bold text-soft-charcoal text-sm">{book.title}</div>
                                                <div className="text-xs text-soft-charcoal/50">{book.chapters.length} Chapters</div>
                                            </div>
                                            {selectedBook?.id === book.id && <ChevronRight className="ml-auto text-soft-charcoal/40" size={16} />}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Chapter List (Main) */}
                            <div className="flex-1 overflow-y-auto p-8 bg-white/20">
                                {selectedBook ? (
                                    <div className="animate-in slide-in-from-right-4 duration-300">
                                        <div className="flex items-center justify-between mb-6">
                                            <h3 className="text-xl font-bold text-soft-charcoal">{selectedBook.title}</h3>
                                            <span className="text-xs font-mono text-soft-charcoal/40 bg-soft-charcoal/5 px-2 py-1 rounded">
                                                {selectedBook.chapters.length} Stories
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-1 gap-3">
                                            {selectedBook.chapters.map((chapter: any, index: number) => {
                                                const stats = getChapterStats(chapter.id);
                                                const isCurrent = currentChapterId === chapter.id;

                                                return (
                                                    <div
                                                        key={chapter.id}
                                                        onClick={() => handleChapterSelect(chapter)}
                                                        className={clsx(
                                                            "group p-4 rounded-lg border flex items-center justify-between hover:scale-[1.01] transition-all w-full cursor-pointer relative",
                                                            isCurrent
                                                                ? "bg-soft-charcoal text-parchment border-soft-charcoal shadow-lg"
                                                                : "bg-white border-soft-charcoal/10 hover:border-soft-charcoal/30 hover:shadow-md"
                                                        )}
                                                    >
                                                        <div className="flex items-center gap-4 flex-1">
                                                            <span className={clsx(
                                                                "font-mono text-sm w-8 h-8 flex items-center justify-center rounded-full shrink-0",
                                                                isCurrent ? "bg-white/10" : "bg-soft-charcoal/5 text-soft-charcoal/60"
                                                            )}>
                                                                {index + 1}
                                                            </span>
                                                            <div className="text-left flex-1">
                                                                <div className={clsx("font-medium line-clamp-1", isCurrent ? "text-white" : "text-soft-charcoal")}>
                                                                    {chapter.title}
                                                                </div>
                                                                {stats ? (
                                                                    <div className={clsx("text-xs flex items-center gap-2 mt-1 font-mono", isCurrent ? "text-white/60" : "text-soft-charcoal/50")}>
                                                                        <span>Last Acc: {stats.lastAccuracy}%</span>
                                                                        {stats.wrongWords && stats.wrongWords.length > 0 && (
                                                                            <button
                                                                                onClick={(e) => handleViewMissedWords(e, chapter.id)}
                                                                                className={clsx(
                                                                                    "ml-2 px-2 py-0.5 rounded transition-colors hover:bg-black/10 flex items-center gap-1",
                                                                                    isCurrent ? "text-red-300 hover:text-white" : "text-red-500 hover:text-red-700"
                                                                                )}
                                                                            >
                                                                                • {stats.wrongWords.length} Missed Words (View)
                                                                            </button>
                                                                        )}
                                                                    </div>
                                                                ) : (
                                                                    <div className={clsx("text-xs mt-1 font-mono opacity-50", isCurrent ? "text-white/40" : "text-soft-charcoal/40")}>
                                                                        Not attempted yet
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>

                                                        <div className={clsx("shrink-0 ml-4", isCurrent ? "text-white" : "text-soft-charcoal/20 group-hover:text-soft-charcoal/60")}>
                                                            {isCurrent ? <CheckCircle2 size={20} /> : <div className="text-xs uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 transition-opacity">Start</div>}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center text-soft-charcoal/30">
                                        <BookOpen size={48} className="mb-4 opacity-50" />
                                        <p>Select a book from the left to view stories.</p>
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            )}

            {/* Missed Words Popup Modal */}
            {viewingStatsChapterId && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-md p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-xl shadow-2xl p-8 max-w-xl w-full relative transform transition-all scale-100">
                        <button
                            onClick={() => setViewingStatsChapterId(null)}
                            className="absolute top-4 right-4 text-soft-charcoal/40 hover:text-soft-charcoal transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <h3 className="text-lg font-bold text-soft-charcoal mb-1">Difficult Words</h3>
                        <p className="text-sm text-soft-charcoal/60 mb-4">Words missed in previous attempt:</p>

                        <div className="flex flex-wrap gap-2 max-h-[60vh] overflow-y-auto p-1">
                            {getChapterStats(viewingStatsChapterId)?.wrongWords?.map((word: string, i: number) => (
                                <span key={i} className="px-3 py-1.5 bg-red-50 text-red-600 border border-red-100 rounded text-base font-mono font-medium">
                                    {word}
                                </span>
                            ))}
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={() => setViewingStatsChapterId(null)}
                                className="px-4 py-2 bg-soft-charcoal text-white rounded text-sm font-medium hover:bg-soft-charcoal/90"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
