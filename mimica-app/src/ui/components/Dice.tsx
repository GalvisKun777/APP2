import React from 'react';
import { motion } from 'framer-motion';
import { THEME } from '../../config/theme';

interface DiceProps {
    value?: number;
    color?: string;
    isRolling?: boolean;
    size?: number;
}

export const Dice: React.FC<DiceProps> = ({
    value,
    color = THEME.colors.primary,
    isRolling = false,
    size = 120
}) => {
    // Dice dot positions for values 1-6
    const dots: Record<number, string[]> = {
        1: ['center'],
        2: ['top-right', 'bottom-left'],
        3: ['top-right', 'center', 'bottom-left'],
        4: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
        5: ['top-left', 'top-right', 'center', 'bottom-left', 'bottom-right'],
        6: ['top-left', 'top-right', 'middle-left', 'middle-right', 'bottom-left', 'bottom-right']
    };

    const getDotClass = (position: string) => {
        const base = "absolute rounded-full shadow-inner";
        const positions: Record<string, string> = {
            'top-left': 'top-[20%] left-[20%]',
            'top-right': 'top-[20%] right-[20%]',
            'middle-left': 'top-[45%] left-[20%]',
            'middle-right': 'top-[45%] right-[20%]',
            'bottom-left': 'bottom-[20%] left-[20%]',
            'bottom-right': 'bottom-[20%] right-[20%]',
            'center': 'top-[45%] left-[45%]'
        };
        return `${base} ${positions[position]}`;
    };

    return (
        <motion.div
            animate={isRolling ? {
                rotateX: [0, 90, 180, 270, 360],
                rotateY: [0, 90, 180, 270, 360],
                scale: [1, 1.1, 1],
            } : {}}
            transition={{ duration: 0.6, repeat: isRolling ? Infinity : 0, ease: "linear" }}
            className="rounded-[2.5rem] relative flex items-center justify-center shadow-2xl"
            style={{
                width: size,
                height: size,
                background: `linear-gradient(135deg, ${color} 0%, ${color}CC 100%)`,
                boxShadow: `inset 0 10px 20px rgba(255,255,255,0.3), 0 20px 40px rgba(0,0,0,0.4), 0 0 20px ${color}40`,
                border: '4px solid rgba(255,255,255,0.1)'
            }}
        >
            {value && dots[value].map((pos, i) => (
                <div
                    key={i}
                    className={getDotClass(pos)}
                    style={{
                        width: size * 0.15,
                        height: size * 0.15,
                        backgroundColor: '#ffffff',
                        boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.4)'
                    }}
                />
            ))}
            {!value && !isRolling && (
                <div className="opacity-30 border-4 border-white/30 rounded-full w-4 h-4" />
            )}
        </motion.div>
    );
};
