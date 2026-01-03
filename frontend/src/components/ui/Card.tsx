import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface CardProps extends HTMLMotionProps<"div"> {
    variant?: 'default' | 'glass' | 'outline';
}

export const Card: React.FC<CardProps> = ({
    children,
    variant = 'glass',
    className = '',
    ...props
}) => {
    const variants = {
        default: "bg-[var(--bg-darker)] border border-white/5 shadow-lg",
        glass: "bg-[var(--bg-glass)] border border-white/10 shadow-xl backdrop-blur-md",
        outline: "border border-white/10 bg-transparent"
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className={`rounded-[var(--radius-lg)] p-6 ${variants[variant]} ${className} transition-colors duration-300 hover:border-white/20`}
            {...props}
        >
            {children}
        </motion.div>
    );
};
