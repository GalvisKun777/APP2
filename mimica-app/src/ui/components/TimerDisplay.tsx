import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { THEME } from '../../config/theme';

interface TimerDisplayProps {
    seconds: number;
    initialSeconds: number;
    isActive: boolean;
}

export const TimerDisplay: React.FC<TimerDisplayProps> = ({
    seconds,
    initialSeconds,
    isActive
}) => {
    const controls = useAnimation();
    const percentage = (seconds / initialSeconds) * 100;

    useEffect(() => {
        if (seconds <= 10 && isActive) {
            controls.start({
                scale: [1, 1.15, 1],
                transition: { duration: 0.5, repeat: Infinity }
            });
        } else {
            controls.stop();
        }
    }, [seconds, isActive, controls]);

    const isCritical = seconds <= 10;

    return (
        <div className="relative flex items-center justify-center my-12">
            {/* Outer Glow Ring */}
            {isCritical && (
                <motion.div
                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="absolute w-[240px] h-[240px] rounded-full"
                    style={{ background: `radial-gradient(circle, ${THEME.colors.danger}30 0%, transparent 70%)` }}
                />
            )}

            <svg width="240" height="240" viewBox="0 0 100 100">
                <circle
                    cx="50" cy="50" r="46"
                    fill="none"
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth="4"
                />
                <motion.circle
                    cx="50" cy="50" r="46"
                    fill="none"
                    stroke={isCritical ? THEME.colors.danger : THEME.colors.primary}
                    strokeWidth="6"
                    strokeDasharray="289"
                    strokeDashoffset={289 - (289 * percentage) / 100}
                    strokeLinecap="round"
                    style={{ filter: `drop-shadow(0 0 8px ${isCritical ? THEME.colors.danger : THEME.colors.primary}80)` }}
                    transform="rotate(-90 50 50)"
                    transition={{ duration: 1, ease: "linear" }}
                />
            </svg>
            <motion.div
                animate={controls}
                className="absolute flex flex-col items-center"
            >
                <span style={{
                    fontSize: '6rem',
                    fontWeight: 900,
                    lineHeight: 1,
                    color: isCritical ? THEME.colors.danger : THEME.colors.text,
                    textShadow: isCritical ? `0 0 30px ${THEME.colors.danger}40` : 'none',
                    letterSpacing: '-0.05em'
                }}>
                    {seconds}
                </span>
                <span style={{
                    fontSize: '0.9rem',
                    fontWeight: 800,
                    color: THEME.colors.textMuted,
                    letterSpacing: '0.2em',
                    marginTop: '-8px'
                }}>
                    SEGUNDOS
                </span>
            </motion.div>
        </div>
    );
};
