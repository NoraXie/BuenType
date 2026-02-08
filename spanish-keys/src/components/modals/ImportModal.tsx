import { useState } from 'react';
import { useTypingStore } from '../../store/useTypingStore';
import { FileText, X } from 'lucide-react';

export const ImportModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [rawText, setRawText] = useState('');
    const { setText } = useTypingStore();

    const processMarkdown = (md: string) => {
        // Simple Markdown stripper tailored for prose
        let text = md;

        // Remove Images ![alt](url)
        text = text.replace(/!\[.*?\]\(.*?\)/g, '');

        // Links [text](url) -> text
        text = text.replace(/\[([^\]]+)\]\(.*?\)/g, '$1');

        // Headers #
        text = text.replace(/^#+\s+/gm, '');

        // Bold/Italic ** or * or __ or _
        // This is tricky with nested but basic approach:
        text = text.replace(/(\*\*|__)(.*?)\1/g, '$2');
        text = text.replace(/(\*|_)(.*?)\1/g, '$2');

        // Code blocks ```...``` -> Remove content? Or keep?
        // Let's assume we want to type the code if present, or strip backticks.
        // Prompt says "Only keep typable Spanish text".
        // Code is usually failing "Spanish text" criteria.
        // Let's just strip backticks.
        text = text.replace(/`/g, '');

        // Blockquotes >
        text = text.replace(/^>\s+/gm, '');

        // Lists - or * or 1.
        text = text.replace(/^[\*\-]\s+/gm, '');
        text = text.replace(/^\d+\.\s+/gm, '');

        // HTML tags
        text = text.replace(/<[^>]*>/g, '');

        // Collapse multiple spaces/newlines
        text = text.replace(/\n\s*\n/g, '\n'); // Max 1 empty line
        text = text.trim();

        return text;
    };

    const handleImport = () => {
        const cleanText = processMarkdown(rawText);
        if (cleanText) {
            setText(cleanText);
            setIsOpen(false);
            setRawText('');
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 text-soft-charcoal/60 hover:text-soft-charcoal transition-colors px-4 py-2 rounded font-sans text-sm font-medium"
            >
                <FileText size={18} />
                Import Text
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
                    <div className="bg-parchment border-2 border-soft-charcoal/10 shadow-xl rounded-lg w-full max-w-2xl p-6 relative animate-in fade-in zoom-in-95 duration-200">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 text-soft-charcoal/40 hover:text-soft-charcoal"
                        >
                            <X size={24} />
                        </button>

                        <h2 className="text-2xl font-bold mb-4 font-sans text-soft-charcoal">Import Text</h2>
                        <p className="mb-4 text-soft-charcoal/70 text-sm">Paste Markdown or text below. We'll strip the formatting for you.</p>

                        <textarea
                            className="w-full h-64 p-4 rounded bg-white/50 border border-soft-charcoal/10 focus:border-soft-charcoal/40 focus:outline-none font-mono text-sm resize-none mb-6 text-soft-charcoal"
                            placeholder="# Paste your Spanish text here..."
                            value={rawText}
                            onChange={(e) => setRawText(e.target.value)}
                        />

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="px-6 py-2 rounded text-soft-charcoal/60 hover:bg-soft-charcoal/5 font-medium transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleImport}
                                disabled={!rawText.trim()}
                                className="px-6 py-2 rounded bg-soft-charcoal text-parchment font-medium hover:bg-soft-charcoal/90 transition-colors disabled:opacity-50"
                            >
                                Load Text
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
