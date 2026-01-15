import React from 'react';
import { motion } from 'framer-motion';
import { THEME } from '../../config/theme';

interface PrimaryButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'danger' | 'success';
    className?: string;
    disabled?: boolean;
    style?: React.CSSProperties;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
    onClick,
    children,
    variant = 'primary',
    className = '',
    disabled = false,
    style = {}
}) => {
    const bgColor = {
        primary: THEME.colors.primary,
        secondary: THEME.colors.secondary,
        danger: THEME.colors.danger,
        success: THEME.colors.success,
    }[variant];

    return (
        <motion.button
            whileHover={{ scale: 1.05, filter: "brightness(1.1)" }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            disabled={disabled}
            className={`px-8 py-4 rounded-2xl font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-2 ${className}`}
            style={{
                backgroundColor: bgColor,
                color: THEME.colors.text,
                boxShadow: variant === 'primary' ? THEME.shadows.glow : THEME.shadows.md,
                opacity: disabled ? 0.6 : 1,
                cursor: disabled ? 'not-allowed' : 'pointer',
                border: 'none',
                minWidth: '200px',
                ...style
            }}
        >
            {children}
        </motion.button>
    );
};
