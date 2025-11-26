import React from 'react';

const StatusBadge = ({ status }) => {
    const styles = {
        success: "bg-success/10 text-success border-success/20",
        error: "bg-error-light/10 dark:bg-error-dark/10 text-error-light dark:text-error-dark border-error-light/20 dark:border-error-dark/20",
        idle: "bg-gray-100 dark:bg-gray-800 text-text-secondary-light dark:text-text-secondary-dark border-gray-200 dark:border-gray-700",
        running: "bg-accent/10 text-accent border-accent/20 animate-pulse"
    };

    const labels = {
        success: "Success",
        error: "Error",
        idle: "Idle",
        running: "Running"
    };

    const normalizedStatus = status.toLowerCase();
    const style = styles[normalizedStatus] || styles.idle;
    const label = labels[normalizedStatus] || status;

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${style} inline-flex items-center gap-1.5`}>
            <span className={`w-1.5 h-1.5 rounded-full ${normalizedStatus === 'running' ? 'bg-current animate-ping' : 'bg-current'}`} />
            {label}
        </span>
    );
};

export default StatusBadge;
