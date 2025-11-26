import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Play, Clock, AlertCircle, CheckCircle, Terminal, ChevronDown, ChevronUp } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import StatusBadge from '../components/StatusBadge';
import { automationApi } from '../api/axios';

const AutomationDetail = () => {
    const { id } = useParams();
    const [isLogsOpen, setIsLogsOpen] = useState(true);
    const [automation, setAutomation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [running, setRunning] = useState(false);
    const [lastRunOutput, setLastRunOutput] = useState(null);

    const fetchAutomation = async () => {
        try {
            const response = await automationApi.getAutomation(id);
            setAutomation(response.data);
        } catch (error) {
            console.error('Error fetching automation:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAutomation();
    }, [id]);

    const handleRun = async () => {
        setRunning(true);
        try {
            const response = await automationApi.runAutomation(id);
            setLastRunOutput(response.data.record.output);
            fetchAutomation(); // Refresh history
        } catch (error) {
            console.error('Error running automation:', error);
            if (error.response?.data?.record?.output) {
                setLastRunOutput(error.response.data.record.output);
            }
        } finally {
            setRunning(false);
        }
    };

    if (loading) return <div className="p-8 text-center">Loading details...</div>;
    if (!automation) return <div className="p-8 text-center">Automation not found</div>;

    const logs = lastRunOutput || (automation.history.length > 0 ? automation.history[0].output : 'No logs available.');

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark">{automation.name}</h1>
                        <StatusBadge status={automation.status} />
                    </div>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark max-w-2xl">{automation.description}</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="secondary">Edit Configuration</Button>
                    <Button onClick={handleRun} disabled={running}>
                        <Play size={18} className={`mr-2 ${running ? 'animate-spin' : ''}`} />
                        {running ? 'Running...' : 'Run Now'}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Stats Row */}
                    <div className="grid grid-cols-3 gap-4">
                        <Card className="p-4">
                            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Success Rate</p>
                            <p className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark mt-1">{automation.stats.successRate}</p>
                        </Card>
                        <Card className="p-4">
                            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Total Runs</p>
                            <p className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark mt-1">{automation.stats.totalRuns}</p>
                        </Card>
                        <Card className="p-4">
                            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Avg Duration</p>
                            <p className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark mt-1">{automation.stats.avgDuration}</p>
                        </Card>
                    </div>

                    {/* Logs Section */}
                    <Card className="overflow-hidden">
                        <div
                            className="flex items-center justify-between mb-4 cursor-pointer"
                            onClick={() => setIsLogsOpen(!isLogsOpen)}
                        >
                            <h3 className="font-semibold text-lg flex items-center gap-2">
                                <Terminal size={20} /> Last Execution Logs
                            </h3>
                            {isLogsOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </div>

                        {isLogsOpen && (
                            <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-300 overflow-x-auto max-h-96 overflow-y-auto">
                                <pre>{logs}</pre>
                            </div>
                        )}
                    </Card>
                </div>

                {/* Sidebar History */}
                <div className="space-y-6">
                    <h3 className="font-semibold text-lg text-text-primary-light dark:text-text-primary-dark">Execution History</h3>
                    <div className="space-y-3">
                        {automation.history.length === 0 ? (
                            <p className="text-text-secondary-light dark:text-text-secondary-dark">No history available.</p>
                        ) : (
                            automation.history.map((run) => (
                                <Card key={run.id} className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-1.5 rounded-full ${run.success ? 'bg-success/10 text-success' : 'bg-error-light/10 text-error-light'
                                            }`}>
                                            {run.success ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark">{new Date(run.timestamp).toLocaleDateString()}</p>
                                            <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">{new Date(run.timestamp).toLocaleTimeString()}</p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-mono text-text-secondary-light dark:text-text-secondary-dark">{run.duration}</span>
                                </Card>
                            ))
                        )}
                    </div>
                    <Button variant="ghost" className="w-full text-sm">View Full History</Button>
                </div>
            </div>
        </div>
    );
};

export default AutomationDetail;
