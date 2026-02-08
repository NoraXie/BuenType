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
                "absolute bg-amber-500 w-0.5 sm:w-[3px] rounded-full transition-all duration-100 ease-linear shadow-[0_0_8px_rgba(245,158,11,0.6)]",
                !isActive ? "animate-blink" : "opacity-100"
            )}
            style={{
                top: `${top}px`,
                left: `${left}px`,
                height: `${height}px`
            }}
        />
    );
};
