import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TIMELINE_STEPS, PLAYLIST } from '../constants';

interface PreloaderProps {
    onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let loadedCount = 0;
        // Collect all assets
        const imagesToLoad = TIMELINE_STEPS.map(step => step.image);
        // Add the first song to preload (optional, but good for immediate playback)
        const audioToLoad = [`/music/${PLAYLIST[0]?.file}`];

        const totalAssets = imagesToLoad.length; // Focus on images primarily to avoid long waits for audio

        const updateProgress = () => {
            loadedCount++;
            const percent = Math.floor((loadedCount / totalAssets) * 100);
            setProgress(percent);

            if (loadedCount >= totalAssets) {
                // Add a small buffer time for the animation to feel complete
                setTimeout(() => {
                    onComplete();
                }, 800);
            }
        };

        // Load Images
        imagesToLoad.forEach(src => {
            const img = new Image();
            img.src = src;
            img.onload = updateProgress;
            img.onerror = updateProgress; // Proceed even if one fails
        });

        // Fallback in case things hang (5 seconds max)
        const timeout = setTimeout(() => {
            onComplete();
        }, 5000);

        return () => clearTimeout(timeout);
    }, [onComplete]);

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-stone-100 dark:bg-black transition-colors duration-500">
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5]
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="mb-8"
            >
                {/* Simple Heart SVG */}
                <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor" className="text-rose-500">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
            </motion.div>

            <div className="w-48 h-1 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-rose-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                />
            </div>
            <p className="mt-4 text-stone-500 text-sm font-sans tracking-widest">LOADING MEMORIES... {progress}%</p>
        </div>
    );
};

export default Preloader;
