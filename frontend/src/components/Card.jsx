import React from 'react';

const Card = ({ children, className = '', ...props }) => {
    return (
        <div
            className={`bg-card-light dark:bg-card-dark rounded-xl p-6 shadow-soft hover:shadow-lg transition-shadow duration-300 ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;
