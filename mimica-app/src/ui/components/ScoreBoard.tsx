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
            className="fixed top-4 left-4 z-50 flex flex-col gap-2 pointer-events-none"
        >
            {teams.map((team, idx) => (
                <div
                    key={team.id}
                    className="glass flex items-center gap-3 px-4 py-2"
                    style={{
                        borderColor: idx === 0 ? THEME.colors.primary : THEME.colors.secondary,
                        borderLeftWidth: '4px'
                    }}
                >
                    <span
                        className="font-bold text-sm uppercase"
                        style={{ color: THEME.colors.textMuted }}
                    >
                        {team.name}
                    </span>
                    <span
                        className="font-bold text-xl"
                        style={{ color: idx === 0 ? THEME.colors.primary : THEME.colors.secondary }}
                    >
                        {team.score}
                    </span>
                </div>
            ))}
        </motion.div>
    );
};
