import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { THEME } from '../../config/theme';
import { PrimaryButton } from '../components/PrimaryButton';
import { Dice } from '../components/Dice';
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
        }, 1200);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center gap-10 py-8 h-full"
        >
            <header className="text-center">
                <h1 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>¿Quién empieza?</h1>
                <p style={{ color: THEME.colors.textMuted, fontSize: '1.2rem', fontWeight: 600 }}>Tiren los dados para decidir</p>
            </header>

            <div className="flex gap-12 items-center justify-center w-full">
                {/* Team 1 */}
                <div className={`flex flex-col items-center gap-6 transition-all duration-500 ${phase === 'waiting' || phase === 'team1' ? 'scale-110' : 'opacity-40 grayscale'}`}>
                    <h3 className="font-black text-xl" style={{ color: THEME.colors.primary }}>{teams[0].name}</h3>
                    <Dice
                        value={team1Roll}
                        color={THEME.colors.primary}
                        isRolling={isRolling && phase === 'team1'}
                        size={140}
                    />
                    {phase === 'team1' && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                            <PrimaryButton
                                onClick={() => handleRoll(1)}
                                disabled={isRolling}
                                style={{ height: '60px', minWidth: '160px' }}
                            >
                                {isRolling ? '...' : 'TIRAR'}
                            </PrimaryButton>
                        </motion.div>
                    )}
                </div>

                {/* VS Divider */}
                <div className="flex flex-col items-center gap-2">
                    <div className="w-[2px] h-12 bg-white/10" />
                    <span className="font-black text-2xl text-white/20 italic">VS</span>
                    <div className="w-[2px] h-12 bg-white/10" />
                </div>

                {/* Team 2 */}
                <div className={`flex flex-col items-center gap-6 transition-all duration-500 ${phase === 'team2' ? 'scale-110' : 'opacity-40 grayscale'}`}>
                    <h3 className="font-black text-xl" style={{ color: THEME.colors.secondary }}>{teams[1].name}</h3>
                    <Dice
                        value={team2Roll}
                        color={THEME.colors.secondary}
                        isRolling={isRolling && phase === 'team2'}
                        size={140}
                    />
                    {phase === 'team2' && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                            <PrimaryButton
                                onClick={() => handleRoll(2)}
                                variant="secondary"
                                disabled={isRolling}
                                style={{ height: '60px', minWidth: '160px' }}
                            >
                                {isRolling ? '...' : 'TIRAR'}
                            </PrimaryButton>
                        </motion.div>
                    )}
                </div>
            </div>

            {phase === 'complete' && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center gap-4 mt-8"
                >
                    <div className="glass px-8 py-4 border-2 flex flex-col items-center"
                        style={{ borderColor: team1Roll === team2Roll ? THEME.colors.accent : (team1Roll || 0) > (team2Roll || 0) ? THEME.colors.primary : THEME.colors.secondary }}>
                        <h2 style={{ fontSize: '1.75rem', margin: 0 }}>
                            {team1Roll === team2Roll ? (
                                "¡Empate! Tiren de nuevo"
                            ) : (
                                <>Empieza: <span className="text-gradient">
                                    {(team1Roll || 0) > (team2Roll || 0) ? teams[0].name : teams[1].name}
                                </span></>
                            )}
                        </h2>
                    </div>

                    {team1Roll !== team2Roll ? (
                        <PrimaryButton onClick={onComplete} variant="success" className="mt-4">
                            CONTINUAR
                        </PrimaryButton>
                    ) : (
                        <PrimaryButton onClick={() => onRoll(1)} variant="primary" className="mt-4">
                            REINTENTAR
                        </PrimaryButton>
                    )}
                </motion.div>
            )}

            {phase === 'waiting' && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <PrimaryButton onClick={() => handleRoll(1)} style={{ height: '80px', fontSize: '1.75rem' }}>
                        ¡QUIERO TIRAR!
                    </PrimaryButton>
                </motion.div>
            )}

        </motion.div>
    );
};
