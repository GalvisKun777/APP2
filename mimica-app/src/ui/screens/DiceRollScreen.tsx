import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Dice6 } from 'lucide-react';
import { THEME } from '../../config/theme';
import { PrimaryButton } from '../components/PrimaryButton';
import type { Team } from '../../models/Team';

interface DiceRollScreenProps {
    teams: Team[];
    team1Roll?: number;
    team2Roll?: number;
    phase: 'waiting' | 'team1' | 'team2' | 'complete';
    onRoll: (teamIndex: 1 | 2) => void;
    onComplete: () => void;
}

export const DiceRollScreen: React.FC<DiceRollScreenProps> = ({
    teams,
    team1Roll,
    team2Roll,
    phase,
    onRoll,
    onComplete
}) => {
    const [isRolling, setIsRolling] = useState(false);

    const handleRoll = (teamIndex: 1 | 2) => {
        setIsRolling(true);
        setTimeout(() => {
            onRoll(teamIndex);
            setIsRolling(false);
        }, 1000);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center gap-8 py-8 h-full"
        >
            <header className="text-center">
                <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>¿Quién empieza?</h1>
                <p style={{ color: THEME.colors.textMuted }}>Tiren los dados para decidir</p>
            </header>

            <div className="flex gap-8 items-center justify-center w-full">
                {/* Team 1 */}
                <div className={`flex flex-col items-center gap-4 transition-opacity ${phase === 'waiting' || phase === 'team1' ? 'opacity-100' : 'opacity-70'}`}>
                    <h3 style={{ color: THEME.colors.primary }}>{teams[0].name}</h3>
                    <motion.div
                        animate={isRolling && phase === 'team1' ? {
                            rotate: [0, 360],
                            y: [0, -20, 0]
                        } : {}}
                        transition={{ duration: 0.5, repeat: isRolling ? Infinity : 0 }}
                        className="glass p-6 w-32 h-32 flex items-center justify-center"
                        style={{
                            borderColor: phase === 'team1' ? THEME.colors.primary : 'transparent',
                            boxShadow: phase === 'team1' ? THEME.shadows.glow : 'none'
                        }}
                    >
                        {team1Roll ? (
                            <span style={{ fontSize: '3rem', fontWeight: 'bold' }}>{team1Roll}</span>
                        ) : (
                            <Dice6 size={48} color={THEME.colors.textMuted} />
                        )}
                    </motion.div>
                    {phase === 'team1' && (
                        <PrimaryButton
                            onClick={() => handleRoll(1)}
                            disabled={isRolling}
                            className="w-full"
                        >
                            {isRolling ? 'Tirando...' : 'Tirar Dado'}
                        </PrimaryButton>
                    )}
                </div>

                {/* VS Divider */}
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: THEME.colors.textMuted }}>VS</span>

                {/* Team 2 */}
                <div className={`flex flex-col items-center gap-4 transition-opacity ${phase === 'team2' ? 'opacity-100' : 'opacity-70'}`}>
                    <h3 style={{ color: THEME.colors.secondary }}>{teams[1].name}</h3>
                    <motion.div
                        animate={isRolling && phase === 'team2' ? {
                            rotate: [0, 360],
                            y: [0, -20, 0]
                        } : {}}
                        transition={{ duration: 0.5, repeat: isRolling ? Infinity : 0 }}
                        className="glass p-6 w-32 h-32 flex items-center justify-center"
                        style={{
                            borderColor: phase === 'team2' ? THEME.colors.secondary : 'transparent',
                            boxShadow: phase === 'team2' ? THEME.shadows.glow : 'none'
                        }}
                    >
                        {team2Roll ? (
                            <span style={{ fontSize: '3rem', fontWeight: 'bold' }}>{team2Roll}</span>
                        ) : (
                            <Dice6 size={48} color={THEME.colors.textMuted} />
                        )}
                    </motion.div>
                    {phase === 'team2' && (
                        <PrimaryButton
                            onClick={() => handleRoll(2)}
                            variant="secondary"
                            disabled={isRolling}
                            className="w-full"
                        >
                            {isRolling ? 'Tirando...' : 'Tirar Dado'}
                        </PrimaryButton>
                    )}
                </div>
            </div>

            {phase === 'complete' && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center gap-4 mt-8"
                >
                    <h2 style={{ fontSize: '1.5rem', margin: 0 }}>
                        {team1Roll === team2Roll ? (
                            "¡Empate! Tiren de nuevo"
                        ) : (
                            <>Empieza: <span style={{ color: (team1Roll || 0) > (team2Roll || 0) ? THEME.colors.primary : THEME.colors.secondary }}>
                                {(team1Roll || 0) > (team2Roll || 0) ? teams[0].name : teams[1].name}
                            </span></>
                        )}
                    </h2>

                    {team1Roll !== team2Roll ? (
                        <PrimaryButton onClick={onComplete} variant="success">
                            CONTINUAR
                        </PrimaryButton>
                    ) : (
                        <PrimaryButton onClick={() => onRoll(1)} variant="primary">
                            REINTENTAR
                        </PrimaryButton>
                    )}
                </motion.div>
            )}

            {/* Start Button for Phase 1 (Waiting) */}
            {phase === 'waiting' && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <PrimaryButton onClick={() => onRoll(1)}>
                        EMPEZAR SORTEO
                    </PrimaryButton>
                </motion.div>
            )}

        </motion.div>
    );
};
