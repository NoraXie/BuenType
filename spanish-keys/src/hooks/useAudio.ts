import { useEffect, useRef, useState } from 'react';

type SoundType = 'click' | 'success' | 'error';

export const useAudio = () => {
    const audioContextRef = useRef<AudioContext | null>(null);
    const buffersRef = useRef<Record<SoundType, AudioBuffer | null>>({
        click: null,
        success: null,
        error: null
    });
    const gainNodesRef = useRef<Record<SoundType, GainNode | null>>({
        click: null,
        success: null,
        error: null
    });

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const initAudio = async () => {
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
            if (!AudioContext) return;

            const ctx = new AudioContext();
            audioContextRef.current = ctx;

            const loadSound = async (url: string, type: SoundType, volume: number) => {
                try {
                    const response = await fetch(url);
                    if (!response.ok) throw new Error(`Failed to load ${url}`);
                    const arrayBuffer = await response.arrayBuffer();
                    const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
                    buffersRef.current[type] = audioBuffer;

                    const gainNode = ctx.createGain();
                    gainNode.gain.value = volume;
                    gainNode.connect(ctx.destination);
                    gainNodesRef.current[type] = gainNode;
                } catch (e) {
                    console.warn(`Audio file for ${type} not found, using synth fallback.`);
                    // Fallback handled in play function
                }
            };

            await Promise.all([
                loadSound('/audio/click.mp3', 'click', 0.2),   // 20% volume
                loadSound('/audio/success.mp3', 'success', 0.6), // 60% volume
                loadSound('/audio/error.mp3', 'error', 0.5),   // "Heavier" error sound
            ]);

            setIsLoaded(true);
        };

        initAudio();

        return () => {
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
        };
    }, []);

    // const playSynth = (type: SoundType) => {
    //     const ctx = audioContextRef.current;
    //     if (!ctx) return;

    //     const osc = ctx.createOscillator();
    //     const gain = ctx.createGain();

    //     osc.connect(gain);
    //     gain.connect(ctx.destination);

    //     if (type === 'click') {
    //         osc.frequency.setValueAtTime(880, ctx.currentTime);
    //         osc.type = 'square'; // Short 880Hz square
    //         gain.gain.setValueAtTime(0.1, ctx.currentTime);
    //         gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
    //         osc.start();
    //         osc.stop(ctx.currentTime + 0.05);
    //     } else if (type === 'success') {
    //         osc.frequency.setValueAtTime(1760, ctx.currentTime);
    //         osc.type = 'sine'; // Crisp 1760Hz sine
    //         gain.gain.setValueAtTime(0.3, ctx.currentTime);
    //         gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
    //         osc.start();
    //         osc.stop(ctx.currentTime + 0.1);
    //     } else if (type === 'error') {
    //         osc.frequency.setValueAtTime(200, ctx.currentTime);
    //         osc.type = 'sawtooth'; // Low 200Hz sawtooth
    //         gain.gain.setValueAtTime(0.3, ctx.currentTime);
    //         gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
    //         osc.start();
    //         osc.stop(ctx.currentTime + 0.15);
    //     }
    // };

    const play = (_type: SoundType) => {
        // Audio disabled per user request
        return;
    };

    return { play, isLoaded };
};
