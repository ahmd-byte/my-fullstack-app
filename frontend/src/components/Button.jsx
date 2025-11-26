import React from 'react';

const Button = ({
    children,
    variant = 'primary',
    className = '',
    ...props
}) => {
    const baseStyles = "h-[42px] px-6 rounded-[10px] font-medium transition-all duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-accent/50 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-gradient-to-r from-accent to-blue-600 text-white hover:brightness-110 shadow-lg shadow-blue-500/20",
        secondary: "border border-divider-light dark:border-divider-dark text-text-primary-light dark:text-text-primary-dark hover:bg-gray-50 dark:hover:bg-white/5",
        ghost: "text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark hover:bg-gray-100 dark:hover:bg-white/5",
        danger: "bg-error-light dark:bg-error-dark text-white hover:brightness-110"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
