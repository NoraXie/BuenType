import clsx from 'clsx';
import { useTypingStore } from '../../store/useTypingStore';

interface CursorProps {
    top: number;
    left: number;
    height?: number;
}

export const Cursor = ({ top, left, height = 24 }: CursorProps) => {
    const { isActive, isFinished } = useTypingStore();

    if (isFinished) return null;

    return (
        <div
            className={clsx(
                "absolute bg-soft-charcoal w-0.5 rounded transition-all duration-100 ease-linear",
                isActive ? "opacity-100" : "animate-pulse" // Stop blinking while typing? Or always blink?
            )}
            style={{
                top: `${top}px`,
                left: `${left}px`,
                height: `${height}px`
            }}
        />
    );
};
