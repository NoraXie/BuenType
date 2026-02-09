import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { useTypingStore } from '../../store/useTypingStore';
import { Cursor } from './Cursor';
import { Keyboard, X } from 'lucide-react';
import { useTypingEngine } from '../../hooks/useTypingEngine';

export const TypingDisplay = () => {
    const {
        text,
        currentIndex,
        errors,
        isFinished,
        consecutiveErrors
    } = useTypingStore();

    // Engine hook handles input and focus
    const {
        inputRef,
        handleInput,
        handleKeyDown,
        setFocus,
        handleCompositionStart,
        handleCompositionEnd
    } = useTypingEngine();

    const containerRef = useRef<HTMLDivElement>(null);
    const charRefs = useRef<(HTMLSpanElement | null)[]>([]);

    const [cursorPos, setCursorPos] = useState({ top: 0, left: 0 });
    const [isHintDismissed, setIsHintDismissed] = useState(false);

    // Reset hint dismissed state when consecutiveErrors drops to 0
    useEffect(() => {
        if (consecutiveErrors === 0) {
            setIsHintDismissed(false);
        }
    }, [consecutiveErrors]);

    // Ensure refs array matches text length
    // We only need to expand it if text grows (e.g. import). 
    // Usually React handles array of refs automatically in callback or map, 
    // but callback ref is better for dynamic list.

    // Calculate cursor position effect
    useEffect(() => {
        if (!containerRef.current || isFinished) return;

        const updateCursor = () => {
            // If verify currentIndex is valid
            const targetIndex = Math.min(currentIndex, text.length);
            // If at end, use last char + width? Or just use a dummy element at end?
            // If we are at the very end, we might not have a ref for text[length].
            // So we need a "trailing" character or marker.

            const charEl = charRefs.current[targetIndex];

            if (charEl) {
                setCursorPos({
                    top: charEl.offsetTop,
                    left: charEl.offsetLeft
                });
            } else {
                // Determine position if at end (after last char)
                const lastChar = charRefs.current[text.length - 1];
                if (lastChar) {
                    setCursorPos({
                        top: lastChar.offsetTop,
                        left: lastChar.offsetLeft + lastChar.offsetWidth
                    });
                } else {
                    // Empty text? Start at 0,0 relative to container
                    setCursorPos({ top: 0, left: 0 });
                }
            }
        };

        // Run immediately
        updateCursor();

        // Also on resize
        window.addEventListener('resize', updateCursor);
        return () => window.removeEventListener('resize', updateCursor);
    }, [currentIndex, text, isFinished]);

    // Focus on click
    const handleContainerClick = () => {
        setFocus();
    };

    return (
        <div
            className="relative font-mono text-2xl leading-relaxed outline-none max-w-7xl mx-auto p-8"
            onClick={handleContainerClick}
        >
            {/* Hidden Input for Mobile/IME/Access */}
            <textarea
                ref={inputRef}
                className="absolute opacity-0 -z-10 w-0 h-0 resize-none overflow-hidden"
                onInput={handleInput}
                onKeyDown={handleKeyDown}
                onCompositionStart={handleCompositionStart}
                onCompositionEnd={handleCompositionEnd}
                autoFocus
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                rows={1}
            />

            {/* Render Text */}
            <div
                ref={containerRef}
                className="relative whitespace-pre-wrap break-words text-soft-charcoal/50 select-none tracking-wide"
                style={{ minHeight: '100px' }}
            >
                {/* Cursor Layer */}
                <Cursor top={cursorPos.top} left={cursorPos.left} />

                {text.split('').map((char, index) => {

                    const isTyped = index < currentIndex;
                    const isError = errors.includes(index);
                    const isCorrect = isTyped && !isError;

                    return (
                        <span
                            key={index}
                            ref={(el) => { charRefs.current[index] = el; }}
                            className={clsx(
                                "transition-colors duration-75",
                                {
                                    // Typed & Correct -> Dark Charcoal
                                    "text-soft-charcoal opacity-100": isCorrect,
                                    // Typed & Error -> Red
                                    "text-red-600 bg-red-100 opacity-100 font-medium": isError,

                                    // Special chars styling?
                                    "bg-red-500/20": isError && char === ' ',
                                    // Show newline errors?
                                },
                            )}
                        >
                            {char}
                        </span>
                    );
                })}
                {/* Dummy span for end of text cursor position */}
                <span
                    ref={(el) => { charRefs.current[text.length] = el; }}
                    className="inline-block w-0"
                >&#8203;</span>
            </div>

            {/* Keyboard Layout Hint */}
            {consecutiveErrors >= 5 && !isHintDismissed && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-50 border-2 border-amber-200 p-6 rounded-2xl shadow-2xl z-30 max-w-sm w-full animate-in zoom-in duration-300">
                    <button
                        onClick={() => setIsHintDismissed(true)}
                        className="absolute top-3 right-3 text-amber-900/40 hover:text-amber-900 transition-colors"
                        title="Dismiss"
                    >
                        <X size={18} />
                    </button>
                    <div className="flex flex-col items-center text-center gap-4">
                        <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                            <Keyboard size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold text-soft-charcoal text-lg">Multiple Errors Detected</h4>
                            <p className="text-sm text-soft-charcoal/70 mt-1">
                                It looks like you're having trouble. Please make sure your keyboard input method is set to <span className="font-bold text-amber-700">Spanish</span>.
                            </p>
                        </div>
                        <div className="text-[10px] text-amber-800/40 uppercase tracking-widest font-black">
                            Tip: Correct typing will hide this message
                        </div>
                    </div>
                </div>
            )}

            {/* Overlay if Finished? Handled by parent or ResultsScreen */}
        </div>
    );
};
