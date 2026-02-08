import { Keyboard } from 'lucide-react';

import { KEY_HINTS } from '../data/keyHintsData';

export const KeyHints = () => {

    return (
        <div className="w-full max-w-7xl mx-auto mt-8 pt-6 border-t border-soft-charcoal/10 px-4">
            <div className="flex items-center gap-2 mb-4 text-soft-charcoal/40 text-xs uppercase tracking-widest font-bold">
                <Keyboard size={14} />
                <span>Spanish Keyboard Tips (Mac)</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2">
                {KEY_HINTS.map((hint) => (
                    <div key={hint.char} className="bg-white/40 border border-soft-charcoal/5 rounded px-2 py-4 flex flex-col items-center justify-center gap-2 hover:bg-white/80 transition-colors h-24">
                        <span className="text-3xl font-bold text-soft-charcoal leading-none">{hint.char}</span>
                        <code className="text-xs text-soft-charcoal/70 font-mono whitespace-nowrap bg-soft-charcoal/5 px-2 py-1 rounded text-center w-full overflow-hidden text-ellipsis font-bold">
                            {hint.label}
                        </code>
                    </div>
                ))}
            </div>
        </div>
    );
};
