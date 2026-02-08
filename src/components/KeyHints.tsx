import { Keyboard } from 'lucide-react';

import { KEY_HINTS } from '../data/keyHintsData';

export const KeyHints = () => {

    return (
        <div className="w-full">
            <div className="flex items-center gap-2 mb-4 text-soft-charcoal/40 text-xs uppercase tracking-widest font-bold">
                <Keyboard size={14} />
                <span>Spanish Keyboard Tips (Mac)</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-3">
                {KEY_HINTS.map((hint) => (
                    <div
                        key={hint.char}
                        className="group relative bg-white border-2 border-soft-charcoal/5 rounded-xl px-2 py-6 flex flex-col items-center justify-center gap-3 hover:border-soft-charcoal/20 transition-all duration-200 min-h-[120px] h-auto cursor-help shadow-sm hover:shadow-md"
                    >
                        <span className="text-4xl font-black text-soft-charcoal leading-none transition-transform group-hover:scale-110">{hint.char}</span>

                        {/* Visible label with wrapping - made much larger */}
                        <code className="text-xs sm:text-sm text-soft-charcoal/80 font-mono whitespace-normal bg-soft-charcoal/5 px-2 py-1.5 rounded-lg text-center w-full font-bold break-words leading-tight">
                            {hint.label}
                        </code>

                        {/* Hover Tooltip - even larger */}
                        <div className="pointer-events-none opacity-0 group-hover:opacity-100 absolute -top-12 left-1/2 -translate-x-1/2 min-w-max bg-soft-charcoal text-parchment text-sm font-bold px-4 py-2 rounded-xl shadow-xl z-20 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                            {hint.label}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-soft-charcoal"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
