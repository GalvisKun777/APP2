import React from 'react';
import { motion } from 'framer-motion';
import { THEME } from '../../config/theme';
import type { Team } from '../../models/Team';

interface ScoreBoardProps {
    teams: Team[];
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({ teams }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="fixed top-4 left-4 z-50 flex flex-col gap-2 pointer-events-none w-48"
        >
            {teams.map((team, idx) => (
                <div
                    key={team.id}
                    className="glass flex items-center justify-between gap-3 px-4 py-2 border-l-4"
                    style={{
                        borderColor: idx === 0 ? THEME.colors.primary : THEME.colors.secondary,
                    }}
                >
                    <span
                        className="font-bold text-xs uppercase truncate max-w-[100px]"
                        style={{ color: THEME.colors.text }}
                    >
                        {team.name}
                    </span>
                    <div
                        className="rounded-full flex items-center justify-center min-w-[28px] h-[28px] px-2 shadow-inner"
                        style={{
                            backgroundColor: idx === 0 ? `${THEME.colors.primary}30` : `${THEME.colors.secondary}30`,
                            border: `1px solid ${idx === 0 ? THEME.colors.primary : THEME.colors.secondary}`
                        }}
                    >
                        <span
                            className="font-black text-sm"
                            style={{ color: idx === 0 ? THEME.colors.primary : THEME.colors.secondary }}
                        >
                            {team.score}
                        </span>
                    </div>
                </div>
            ))}
        </motion.div>
    );
};
