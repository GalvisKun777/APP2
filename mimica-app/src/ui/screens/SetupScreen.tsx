import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Plus, X, Play, Hash } from 'lucide-react';
import { PrimaryButton } from '../components/PrimaryButton';
import { THEME } from '../../config/theme';

interface SetupScreenProps {
    onStart: (team1: string, team1Players: string[], team2: string, team2Players: string[]) => void;
}

export const SetupScreen: React.FC<SetupScreenProps> = ({ onStart }) => {
    const [team1Name, setTeam1Name] = useState('Equipo Alpha');
    const [team2Name, setTeam2Name] = useState('Equipo Beta');
    const [team1Players, setTeam1Players] = useState<string[]>(['Jugador 1']);
    const [team2Players, setTeam2Players] = useState<string[]>(['Jugador 1']);

    const addPlayer = (team: 1 | 2) => {
        if (team === 1) setTeam1Players([...team1Players, `Jugador ${team1Players.length + 1}`]);
        else setTeam2Players([...team2Players, `Jugador ${team2Players.length + 1}`]);
    };

    const removePlayer = (team: 1 | 2, index: number) => {
        if (team === 1) setTeam1Players(team1Players.filter((_, i) => i !== index));
        else setTeam2Players(team2Players.filter((_, i) => i !== index));
    };

    const updatePlayer = (team: 1 | 2, index: number, name: string) => {
        if (team === 1) {
            const newPlayers = [...team1Players];
            newPlayers[index] = name;
            setTeam1Players(newPlayers);
        } else {
            const newPlayers = [...team2Players];
            newPlayers[index] = name;
            setTeam2Players(newPlayers);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col gap-10 py-6"
        >
            <header className="floating">
                <h1 className="text-gradient" style={{ fontSize: '4rem', lineHeight: 1, marginBottom: '0.25rem' }}>
                    Mímica Party
                </h1>
                <p style={{ color: THEME.colors.textMuted, fontSize: '1.2rem', fontWeight: 600 }}>
                    ¡La diversión empieza aquí!
                </p>
            </header>

            <div className="flex flex-col gap-8">
                {[1, 2].map((teamNum) => {
                    const teamName = teamNum === 1 ? team1Name : team2Name;
                    const setTeamName = teamNum === 1 ? setTeam1Name : setTeam2Name;
                    const players = teamNum === 1 ? team1Players : team2Players;
                    const color = teamNum === 1 ? THEME.colors.primary : THEME.colors.secondary;

                    return (
                        <div key={teamNum} className="glass p-8 text-left relative overflow-hidden">
                            {/* Accent line */}
                            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: color }} />

                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 rounded-2xl" style={{ backgroundColor: `${color}15` }}>
                                    <Users size={28} color={color} />
                                </div>
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        value={teamName}
                                        onChange={(e) => setTeamName(e.target.value)}
                                        className="bg-transparent border-none text-2xl font-black focus:outline-none w-full"
                                        style={{ color: color, letterSpacing: '-0.02em' }}
                                        placeholder="Nombre del equipo"
                                    />
                                    <p style={{ fontSize: '0.8rem', color: THEME.colors.textMuted, marginTop: '2px' }}>EQUIPO {teamNum}</p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <AnimatePresence mode="popLayout">
                                    {players.map((player, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            className="glass-card flex items-center gap-3"
                                        >
                                            <Hash size={14} color={THEME.colors.textMuted} />
                                            <input
                                                type="text"
                                                value={player}
                                                onChange={(e) => updatePlayer(teamNum as 1 | 2, idx, e.target.value)}
                                                className="bg-transparent border-none text-white font-medium focus:outline-none w-full px-1"
                                                placeholder={`Jugador ${idx + 1}`}
                                            />
                                            {players.length > 1 && (
                                                <button
                                                    onClick={() => removePlayer(teamNum as 1 | 2, idx)}
                                                    className="p-1 hover:text-red-400 transition-colors bg-white/5 rounded-lg border-none cursor-pointer"
                                                >
                                                    <X size={16} />
                                                </button>
                                            )}
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>

                            <button
                                onClick={() => addPlayer(teamNum as 1 | 2)}
                                className="mt-6 flex items-center gap-2 text-sm font-bold transition-all px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border-none cursor-pointer"
                            >
                                <Plus size={18} /> AÑADIR JUGADOR
                            </button>
                        </div>
                    );
                })}
            </div>

            <div className="px-4">
                <PrimaryButton
                    onClick={() => onStart(team1Name, team1Players, team2Name, team2Players)}
                    style={{
                        height: '72px',
                        fontSize: '1.5rem',
                        fontWeight: 900,
                        borderRadius: '24px',
                        boxShadow: '0 20px 40px -10px rgba(99, 102, 241, 0.4)'
                    }}
                >
                    <Play size={24} fill="currentColor" strokeWidth={0} /> EMPEZAR JUEGO
                </PrimaryButton>
            </div>
        </motion.div>
    );
};
