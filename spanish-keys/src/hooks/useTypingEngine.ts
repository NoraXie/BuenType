import { useEffect, useRef, useCallback } from 'react';
import { useTypingStore } from '../store/useTypingStore';
import { useAudio } from './useAudio';

export const useTypingEngine = () => {
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const {
        text,
        currentIndex,
        handleKey,
        handleBackspace
    } = useTypingStore();

    const { play } = useAudio();

    // Ensure focus is kept on the input
    const setFocus = useCallback(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    // Focus on mount (initial) but be careful with stealing
    useEffect(() => {
        setFocus(); // Initial focus

        const handleClick = (e: MouseEvent) => {
            // Check if user clicked another interactive element
            const target = e.target as HTMLElement;
            if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
                // If it's NOT our hidden input, let the user focus there
                if (target !== inputRef.current) {
                    return;
                }
            }
            // Otherwise, keep focus on the game
            setFocus();
        };

        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, [setFocus]);

    const isComposing = useRef(false);

    const handleCompositionStart = () => {
        isComposing.current = true;
    };

    const handleCompositionEnd = (e: React.CompositionEvent<HTMLTextAreaElement>) => {
        isComposing.current = false;

        const value = e.currentTarget.value;
        if (value) {
            handleInput(e as unknown as React.FormEvent<HTMLTextAreaElement>);
        }
    };

    // Dead key definition
    const DEAD_PREFIXES = ['¨', '´', '`', '^', '~'];
    const DEAD_COMBINATIONS: Record<string, string> = {
        '¨u': 'ü', '¨U': 'Ü',
        '´a': 'á', '´A': 'Á',
        '´e': 'é', '´E': 'É',
        '´i': 'í', '´I': 'Í',
        '´o': 'ó', '´O': 'Ó',
        '´u': 'ú', '´U': 'Ú',
        '¨a': 'ä', '¨e': 'ë', '¨i': 'ï', '¨o': 'ö', // Less common in Spanish but good for completeness
        '~n': 'ñ', '~N': 'Ñ'
    };

    const processInput = useCallback((char: string, e: React.FormEvent<HTMLTextAreaElement>) => {
        // Reset input immediately (Process & Clear)
        // We must clear it to avoid accumulating garbage
        e.currentTarget.value = '';

        // Safety check for empty
        if (!char) return;

        const inputChar = char[0]; // Take first if string
        const expected = text[currentIndex];

        // If text finished, do nothing (though store handles it)
        if (currentIndex >= text.length) return;

        const { correct } = handleKey(inputChar, expected, false); // Always non-blocking per user request

        if (correct) {
            if (inputChar === ' ') {
                play('success');
            } else {
                play('click');
            }
        } else {
            play('error');
        }
    }, [currentIndex, text, handleKey, play]);

    const handleInput = useCallback((e: React.FormEvent<HTMLTextAreaElement>) => {
        // Validation for Composition/Dead Keys
        if (isComposing.current) {
            // Do NOT clear value, let the browser manage the hidden '´' state
            return;
        }

        // Also check native event property for redundancy
        if ((e.nativeEvent as any).isComposing) return;

        const value = e.currentTarget.value;
        if (!value) return;

        // ---------------------------------------------------------
        // DEAD KEY LOGIC
        // ---------------------------------------------------------

        // 1. Check if input is just a dead key prefix
        if (DEAD_PREFIXES.includes(value)) {
            // Check if the EXPECTED character needs this prefix
            // If we expect 'ü' and user typed '¨', wait.
            return;
        }

        // 2. Check if input is a valid combination "Prefix + Char" (e.g. "¨u")
        // Browser might send "¨u" if we didn't clear "¨".
        if (value.length === 2 && DEAD_PREFIXES.includes(value[0])) {
            const combined = DEAD_COMBINATIONS[value];
            if (combined) {
                // We found a match! Process 'ü'
                processInput(combined, e);
                return;
            }
        }

        // 3. Normal input processing (single char or pasted text)
        // If we have a sequence like "¨u" that doesn't match a combo, take the last char 'u'.

        let charToProcess = value;

        if (value.length > 1) {
            charToProcess = value[value.length - 1];
        }

        processInput(charToProcess, e);

    }, [processInput]); // properly depends on processInput

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Backspace') {
            handleBackspace();
        }
        // Block Tab to prevent focus loss
        if (e.key === 'Tab') {
            e.preventDefault();
        }
    }, [handleBackspace]);

    return {
        inputRef,
        setFocus,
        handleInput,
        handleKeyDown,
        handleCompositionStart,
        handleCompositionEnd
    };
};
