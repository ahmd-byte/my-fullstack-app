import React, { useEffect, useState } from 'react';
import { Play, MoreVertical, Clock, Bot } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import StatusBadge from '../components/StatusBadge';
import Input from '../components/Input';
import { automationApi } from '../api/axios';

const AutomationList = () => {
    const navigate = useNavigate();
    const [automations, setAutomations] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAutomations = async () => {
        try {
            const response = await automationApi.getAutomations();
            setAutomations(response.data);
        } catch (error) {
            console.error('Error fetching automations:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAutomations();
    }, []);

    const handleRun = async (e, id) => {
        e.stopPropagation();
        try {
            await automationApi.runAutomation(id);
            fetchAutomations(); // Refresh status
        } catch (error) {
            console.error('Error running automation:', error);
        }
    };

    if (loading) return <div className="p-8 text-center">Loading automations...</div>;

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark">Automations</h1>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark mt-1">Manage and monitor your automation scripts</p>
                </div>
                <div className="flex gap-3">
                    <Input placeholder="Search automations..." className="w-full md:w-64" />
                    <Button>New Automation</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {automations.map((auto) => (
                    <Card
                        key={auto.id}
                        className="group hover:border-accent/30 border border-transparent transition-all duration-300 cursor-pointer flex flex-col h-full"
                        onClick={() => navigate(`/automations/${auto.id}`)}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
                                <Bot size={20} />
                            </div>
                            <button className="p-1 rounded-md text-text-secondary-light dark:text-text-secondary-dark hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
                                <MoreVertical size={18} />
                            </button>
                        </div>

                        <div className="mb-4 flex-1">
                            <h3 className="font-semibold text-lg text-text-primary-light dark:text-text-primary-dark mb-2 group-hover:text-accent transition-colors">
                                {auto.name}
                            </h3>
                            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark line-clamp-2">
                                {auto.description}
                            </p>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-divider-light dark:border-divider-dark mt-auto">
                            <StatusBadge status={auto.status} />
                            <div className="flex items-center gap-3">
                                <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark flex items-center gap-1">
                                    <Clock size={12} /> {auto.lastRun ? new Date(auto.lastRun).toLocaleString() : 'Never'}
                                </span>
                                <button
                                    className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 shadow-lg shadow-accent/30 hover:scale-110"
                                    onClick={(e) => handleRun(e, auto.id)}
                                >
                                    <Play size={14} fill="currentColor" />
                                </button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default AutomationList;
