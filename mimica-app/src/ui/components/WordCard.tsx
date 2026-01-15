import React from 'react';
import { motion } from 'framer-motion';
import { THEME } from '../../config/theme';
import { Target } from 'lucide-react';

interface WordCardProps {
    category: string;
    word: string;
    isTarget?: boolean;
    isRevealed?: boolean;
}

export const WordCard: React.FC<WordCardProps> = ({
    category,
    word,
    isTarget = false,
    isRevealed = true
}) => {
    return (
        <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className={`glass-card flex flex-col items-center justify-center gap-2 p-6 transition-all relative overflow-hidden`}
            style={{
                borderColor: isTarget ? THEME.colors.primary : 'rgba(255,255,255,0.08)',
                boxShadow: isTarget ? `0 0 30px ${THEME.colors.primary}20` : 'none',
                minHeight: '100px',
                borderWidth: isTarget ? '2px' : '1px'
            }}
        >
            {isTarget && (
                <div style={{ position: 'absolute', top: 12, right: 12, opacity: 0.5 }}>
                    <Target size={16} color={THEME.colors.primary} />
                </div>
            )}

            <span style={{
                fontSize: '0.8rem',
                fontWeight: 800,
                color: isTarget ? THEME.colors.primary : THEME.colors.textMuted,
                textTransform: 'uppercase',
                letterSpacing: '0.15em'
            }}>
                {category}
            </span>
            <span style={{
                fontSize: '2.25rem',
                fontWeight: 900,
                color: isTarget ? THEME.colors.text : THEME.colors.text,
                lineHeight: 1.1,
                letterSpacing: '-0.02em'
            }}>
                {isRevealed ? word : "???"}
            </span>
        </motion.div>
    );
};
