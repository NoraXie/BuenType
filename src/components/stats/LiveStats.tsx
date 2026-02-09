import { useTypingStore } from '../../store/useTypingStore';

export const LiveStats = () => {
    const { stats, isFinished } = useTypingStore();

    if (isFinished) return null;

    return (
        <div className="flex gap-8 text-soft-charcoal opacity-70 font-mono text-lg transition-all duration-300">
            <div className="flex flex-col items-center">
                <span className="text-4xl font-bold">{stats.wpm}</span>
                <span className="text-xs tracking-widest uppercase">WPM</span>
            </div>
            <div className="flex flex-col items-center">
                <span className="text-4xl font-bold">{stats.accuracy}%</span>
                <span className="text-xs tracking-widest uppercase">ACC</span>
            </div>
            <div className="flex flex-col items-center">
                <span className="text-4xl font-bold">{stats.correctWords}</span>
                <span className="text-xs tracking-widest uppercase">Words</span>
            </div>
        </div>
    );
};
