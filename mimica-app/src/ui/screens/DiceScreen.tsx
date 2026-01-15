import React from 'react';
import { motion } from 'framer-motion';
import { THEME } from '../../config/theme';
import { PrimaryButton } from '../components/PrimaryButton';
import { Dice } from '../components/Dice';
import type { Team } from '../../models/Team';

interface DiceScreenProps {
    currentTeam: Team;
    onContinue: () => void;
    isFirstTurn?: boolean;
}

export const DiceScreen: React.FC<DiceScreenProps> = ({ currentTeam, onContinue, isFirstTurn = false }) => {
    const currentPlayer = currentTeam.players[currentTeam.currentPlayerIndex];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-12 gap-10"
        >
            <header className="text-center">
                <h1 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '0.25rem' }}>
                    {isFirstTurn ? '¡Sorteo Inicial!' : 'Siguiente Turno'}
                </h1>
                <p style={{ color: THEME.colors.textMuted, fontSize: '1.2rem', fontWeight: 600 }}>Es el momento de:</p>
            </header>

            <motion.div
                className="flex flex-col items-center gap-6"
            >
                <div className="relative">
                    <Dice
                        value={6}
                        color={THEME.colors.primary}
                        isRolling={false}
                        size={160}
                    />
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                        className="absolute inset-x-[-20%] inset-y-[-20%] border-4 border-dashed border-white/5 rounded-full pointer-events-none"
                    />
                </div>

                <div className="glass px-10 py-6 border-b-4 text-center mt-4" style={{ borderColor: THEME.colors.primary }}>
                    <h3 className="font-black" style={{ fontSize: '2.5rem', margin: 0, color: THEME.colors.text }}>
                        {currentTeam.name}
                    </h3>
                    <p style={{ fontSize: '1.5rem', color: THEME.colors.primary, fontWeight: 900, marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                        {currentPlayer}
                    </p>
                </div>
            </motion.div>

            <PrimaryButton onClick={onContinue} style={{ width: '100%', height: '72px' }}>
                REVELAR PALABRAS
            </PrimaryButton>
        </motion.div>
    );
};
