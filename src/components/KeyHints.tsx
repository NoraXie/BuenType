import { Keyboard } from 'lucide-react';

import { KEY_HINTS } from '../data/keyHintsData';

export const KeyHints = () => {

    return (
        <div className="w-full">
            <div className="flex items-center gap-2 mb-4 text-soft-charcoal/40 text-xs uppercase tracking-widest font-bold">
                <Keyboard size={14} />
                <span>Spanish Keyboard Tips (Mac)</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2">
                {KEY_HINTS.map((hint) => (
                    <div
                        key={hint.char}
                        className="group relative bg-white/40 border border-soft-charcoal/5 rounded px-2 py-4 flex flex-col items-center justify-center gap-2 hover:bg-white transition-all duration-200 h-24 hover:scale-110 hover:shadow-xl hover:z-10 cursor-help"
                    >
                        <span className="text-3xl font-bold text-soft-charcoal leading-none transition-transform group-hover:scale-110">{hint.char}</span>

                        {/* Default truncated view */}
                        <code className="text-xs text-soft-charcoal/70 font-mono whitespace-nowrap bg-soft-charcoal/5 px-2 py-1 rounded text-center w-full overflow-hidden text-ellipsis font-bold group-hover:hidden">
                            {hint.label}
                        </code>

                        {/* Hover full view (absolute to break bounds) */}
                        <div className="hidden group-hover:flex absolute -bottom-8 left-1/2 -translate-x-1/2 min-w-max bg-soft-charcoal text-parchment text-xs font-bold px-3 py-1.5 rounded shadow-lg z-20">
                            {hint.label}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
