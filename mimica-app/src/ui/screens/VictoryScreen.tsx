import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { THEME } from '../../config/theme';
import { PrimaryButton } from '../components/PrimaryButton';
import type { Team } from '../../models/Team';
import confetti from 'canvas-confetti';
import { Trophy, RefreshCw, Star } from 'lucide-react';

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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-12 px-6 h-full text-center"
            style={{ minHeight: '80vh' }}
        >
            <div className="relative mb-12">
                <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', damping: 12, stiffness: 200 }}
                >
                    <Trophy size={160} color="#fbbf24" style={{ filter: 'drop-shadow(0 0 30px rgba(251, 191, 36, 0.4))' }} />
                </motion.div>
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ position: 'absolute', top: -20, right: -20 }}
                >
                    <Star size={40} color="#fbbf24" fill="#fbbf24" />
                </motion.div>
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    style={{ position: 'absolute', bottom: 0, left: -30 }}
                >
                    <Star size={30} color="#fbbf24" fill="#fbbf24" />
                </motion.div>
            </div>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                <h1 className="text-gradient" style={{ fontSize: '3.5rem', marginBottom: '0', lineHeight: 1 }}>
                    ¡VICTORIA!
                </h1>
                <h2 className="text-gold" style={{
                    fontSize: '4.5rem',
                    lineHeight: 1.1,
                    marginTop: '0.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '-0.04em'
                }}>
                    {winningTeam.name}
                </h2>
            </motion.div>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                style={{ fontSize: '1.4rem', color: THEME.colors.textMuted, maxWidth: '350px', marginTop: '2rem', fontWeight: 500 }}
            >
                ¡Han demostrado ser los mejores maestros de la mímica!
            </motion.p>

            <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                className="w-full mt-12"
            >
                <PrimaryButton
                    onClick={onRestart}
                    style={{ height: '72px', fontSize: '1.5rem', width: '100%' }}
                >
                    <RefreshCw size={24} style={{ marginRight: '8px' }} /> JUGAR DE NUEVO
                </PrimaryButton>
            </motion.div>
        </motion.div>
    );
};
