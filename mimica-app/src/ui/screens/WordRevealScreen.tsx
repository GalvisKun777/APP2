import React from 'react';
import { motion } from 'framer-motion';
import { THEME } from '../../config/theme';
import { PrimaryButton } from '../components/PrimaryButton';
import { WordCard } from '../components/WordCard';
import { CATEGORIES, type Category } from '../../data/categories';
import { Eye, Info } from 'lucide-react';

interface WordRevealScreenProps {
    roundWords: Record<Category, string>;
    targetCategory: Category;
    onStart: () => void;
}

export const WordRevealScreen: React.FC<WordRevealScreenProps> = ({
    roundWords,
    targetCategory,
    onStart
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col gap-8 py-8 h-full"
        >
            <header>
                <div className="flex justify-center mb-6">
                    <div className="p-4 rounded-full bg-white/5 floating">
                        <Eye size={40} color={THEME.colors.primary} />
                    </div>
                </div>
                <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                    Tu Objetivo
                </h1>
                <p style={{ color: THEME.colors.textMuted, fontSize: '1.1rem' }}>Solo debes actuar la categoría resaltada</p>
            </header>

            <div className="flex flex-col gap-4">
                {CATEGORIES.map((cat) => (
                    <WordCard
                        key={cat}
                        category={cat}
                        word={roundWords[cat]}
                        isTarget={cat === targetCategory}
                    />
                ))}
            </div>

            <div className="banner-alert flex items-start gap-4 text-left mt-4">
                <div className="p-2 rounded-lg bg-white/10">
                    <Info size={24} color={THEME.colors.accent} />
                </div>
                <div>
                    <h4 style={{ color: THEME.colors.accent, fontSize: '0.9rem', marginBottom: '4px', margin: 0 }}>OBJETIVO ACTUAL</h4>
                    <p style={{ fontSize: '1.5rem', fontWeight: 900, margin: 0, letterSpacing: '-0.02em' }}>
                        {targetCategory}
                    </p>
                </div>
            </div>

            <PrimaryButton
                onClick={onStart}
                variant="success"
                className="mt-6"
                style={{ height: '64px', fontSize: '1.25rem' }}
            >
                ¡ESTOY LISTO!
            </PrimaryButton>
        </motion.div>
    );
};
