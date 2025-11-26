import React from 'react';

const Input = ({
    label,
    error,
    icon: Icon,
    className = '',
    ...props
}) => {
    return (
        <div className={`flex flex-col gap-1.5 ${className}`}>
            {label && (
                <label className="text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">
                    {label}
                </label>
            )}
            <div className="relative">
                {Icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary-light dark:text-text-secondary-dark">
                        <Icon size={18} />
                    </div>
                )}
                <input
                    className={`w-full h-[42px] rounded-[10px] bg-white dark:bg-card-dark border border-transparent focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all duration-200 text-text-primary-light dark:text-text-primary-dark placeholder-text-secondary-light/50 dark:placeholder-text-secondary-dark/50 ${Icon ? 'pl-10 pr-4' : 'px-4'
                        } ${error ? 'border-error-light dark:border-error-dark focus:border-error-light dark:focus:border-error-dark focus:ring-error-light/20' : ''}`}
                    {...props}
                />
            </div>
            {error && (
                <span className="text-xs text-error-light dark:text-error-dark">{error}</span>
            )}
        </div>
    );
};

export default Input;
