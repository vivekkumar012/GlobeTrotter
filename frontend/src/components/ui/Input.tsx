import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
    label,
    error,
    icon,
    className = '',
    ...props
}) => {
    return (
        <div className={`space-y-1.5 ${className}`}>
            {label && (
                <label className="block text-sm font-medium text-[var(--text-muted)] ml-1">
                    {label}
                </label>
            )}
            <div className="relative group">
                {icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] group-focus-within:text-[var(--primary)] transition-colors duration-300">
                        {icon}
                    </div>
                )}
                <input
                    className={`
                        w-full bg-[var(--bg-glass)] border border-white/10 rounded-xl 
                        ${icon ? 'pl-10' : 'px-4'} py-3 
                        text-[var(--text-main)] placeholder-[var(--text-muted)]/50
                        focus:outline-none focus:border-[var(--primary)]/50 focus:ring-2 focus:ring-[var(--primary)]/20 
                        transition-all duration-300
                        hover:bg-white/5
                        ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
                    `}
                    {...props}
                />
            </div>
            {error && <p className="text-sm text-red-400 ml-1">{error}</p>}
        </div>
    );
};
