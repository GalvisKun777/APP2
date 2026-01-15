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
    const gradients = {
        primary: `linear-gradient(135deg, ${THEME.colors.primary} 0%, ${THEME.colors.primaryDark} 100%)`,
        secondary: `linear-gradient(135deg, ${THEME.colors.secondary} 0%, #be185d 100%)`,
        danger: `linear-gradient(135deg, ${THEME.colors.danger} 0%, #b91c1c 100%)`,
        success: `linear-gradient(135deg, ${THEME.colors.success} 0%, #047857 100%)`,
    };

    return (
        <motion.button
            whileHover={{
                scale: 1.02,
                translateY: -2,
                boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
            }}
            whileTap={{ scale: 0.98, translateY: 0 }}
            onClick={onClick}
            disabled={disabled}
            className={`px-10 py-5 rounded-full font-black text-xl shadow-xl transition-all flex items-center justify-center gap-3 active:shadow-inner ${className}`}
            style={{
                background: gradients[variant],
                color: '#ffffff',
                opacity: disabled ? 0.6 : 1,
                cursor: disabled ? 'not-allowed' : 'pointer',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                minWidth: '220px',
                letterSpacing: '0.05em',
                ...style
            }}
        >
            {children}
        </motion.button>
    );
};
