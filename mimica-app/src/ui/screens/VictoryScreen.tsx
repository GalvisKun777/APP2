import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { THEME } from '../../config/theme';
import { PrimaryButton } from '../components/PrimaryButton';
import type { Team } from '../../models/Team';
import confetti from 'canvas-confetti';
import { Trophy, RefreshCw } from 'lucide-react';

interface VictoryScreenProps {
    winningTeam: Team;
    onRestart: () => void;
}

export const VictoryScreen: React.FC<VictoryScreenProps> = ({ winningTeam, onRestart }) => {
    useEffect(() => {
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min: number, max: number) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-12 gap-8 text-center"
        >
            <Trophy size={120} color={THEME.colors.accent} />

            <div>
                <h1 style={{ fontSize: '3.5rem', marginBottom: '0' }}>¡VICTORIA!</h1>
                <h2 style={{
                    fontSize: '2.5rem',
                    color: THEME.colors.accent,
                    background: 'none',
                    WebkitTextFillColor: 'initial'
                }}>
                    {winningTeam.name}
                </h2>
            </div>

            <p style={{ fontSize: '1.25rem', color: THEME.colors.textMuted, maxWidth: '300px' }}>
                Han demostrado ser los mejores en el arte de la mímica.
            </p>

            <PrimaryButton onClick={onRestart} className="mt-8">
                <RefreshCw size={20} /> JUGAR DE NUEVO
            </PrimaryButton>
        </motion.div>
    );
};
