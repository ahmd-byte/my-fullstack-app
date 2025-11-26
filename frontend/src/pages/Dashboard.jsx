import React, { useEffect, useState } from 'react';
import { Play, Clock, CheckCircle, AlertCircle, Activity, Bot } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import StatusBadge from '../components/StatusBadge';
import { automationApi } from '../api/axios';
import { useNavigate } from 'react-router-dom';

const StatCard = ({ title, value, change, icon: Icon, trend }) => (
    <Card className="relative overflow-hidden">
        <div className="flex items-start justify-between mb-4">
            <div>
                <p className="text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">{title}</p>
                <h3 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mt-1">{value}</h3>
            </div>
            <div className="p-2 rounded-lg bg-accent/10 text-accent">
                <Icon size={20} />
            </div>
        </div>
        <div className={`text-sm font-medium ${trend === 'up' ? 'text-success' : 'text-error-light'}`}>
            {change} <span className="text-text-secondary-light dark:text-text-secondary-dark font-normal">vs last week</span>
        </div>
    </Card>
);

const Dashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        totalAutomations: 0,
        totalRuns: 0,
        successRate: '0%',
        avgDuration: '0s'
    });
    const [recentActivity, setRecentActivity] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsRes, historyRes] = await Promise.all([
                    automationApi.getStats(),
                    automationApi.getHistory()
                ]);
                setStats(statsRes.data);
                setRecentActivity(historyRes.data.slice(0, 5)); // Get top 5 recent
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleQuickRun = async (id) => {
        try {
            await automationApi.runAutomation(id);
            // Refresh data
            const [statsRes, historyRes] = await Promise.all([
                automationApi.getStats(),
                automationApi.getHistory()
            ]);
            setStats(statsRes.data);
            setRecentActivity(historyRes.data.slice(0, 5));
        } catch (error) {
            console.error('Error running automation:', error);
        }
    };

    if (loading) return <div className="p-8 text-center">Loading dashboard...</div>;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark">Dashboard</h1>
                <p className="text-text-secondary-light dark:text-text-secondary-dark mt-1">Overview of your automation ecosystem</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Automations"
                    value={stats.totalAutomations}
                    change="+0%"
                    trend="up"
                    icon={Bot}
                />
                <StatCard
                    title="Total Runs"
                    value={stats.totalRuns}
                    change="+0%"
                    trend="up"
                    icon={Play}
                />
                <StatCard
                    title="Success Rate"
                    value={stats.successRate}
                    change="+0%"
                    trend="up"
                    icon={CheckCircle}
                />
                <StatCard
                    title="Avg Duration"
                    value={stats.avgDuration}
                    change="0%"
                    trend="down"
                    icon={Clock}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Activity Timeline */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark">Recent Activity</h2>
                        <Button variant="ghost" className="text-sm h-8 px-3" onClick={() => navigate('/logs')}>View All</Button>
                    </div>

                    <div className="space-y-4">
                        {recentActivity.length === 0 ? (
                            <p className="text-text-secondary-light dark:text-text-secondary-dark">No recent activity.</p>
                        ) : (
                            recentActivity.map((item) => (
                                <Card key={item.id} className="flex items-center justify-between p-4 hover:scale-[1.01] transition-transform cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-2 rounded-lg ${item.success ? 'bg-success/10 text-success' : 'bg-error-light/10 text-error-light'
                                            }`}>
                                            {item.success ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-text-primary-light dark:text-text-primary-dark">{item.automationName}</h4>
                                            <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark flex items-center gap-2">
                                                <Clock size={12} /> {new Date(item.timestamp).toLocaleString()} • Duration: {item.duration}
                                            </p>
                                        </div>
                                    </div>
                                    <StatusBadge status={item.success ? 'Success' : 'Error'} />
                                </Card>
                            ))
                        )}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-6">
                    <h2 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark">Quick Run</h2>
                    <Card className="space-y-4">
                        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-4">
                            Frequently used automations
                        </p>
                        <div className="space-y-3">
                            {/* Hardcoded quick runs for demo, ideally fetch favorites */}
                            <div className="flex items-center justify-between p-3 rounded-lg bg-background-light dark:bg-background-dark border border-divider-light dark:border-divider-dark hover:border-accent/50 transition-colors group">
                                <span className="font-medium text-sm text-text-primary-light dark:text-text-primary-dark">Data Sync Daily</span>
                                <button
                                    onClick={() => handleQuickRun('1')}
                                    className="p-2 rounded-md text-text-secondary-light dark:text-text-secondary-dark hover:text-accent hover:bg-accent/10 transition-all opacity-0 group-hover:opacity-100"
                                >
                                    <Play size={16} />
                                </button>
                            </div>
                        </div>
                        <Button variant="secondary" className="w-full mt-2" onClick={() => navigate('/automations')}>View All Automations</Button>
                    </Card>

                    <Card className="bg-gradient-to-br from-accent to-blue-600 text-white border-none">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h3 className="font-bold text-lg">System Status</h3>
                                <p className="text-blue-100 text-sm">All systems operational</p>
                            </div>
                            <Activity className="text-blue-200" />
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-1.5 mb-2">
                            <div className="bg-white h-1.5 rounded-full w-[98%]"></div>
                        </div>
                        <p className="text-xs text-blue-100">Uptime: 99.9%</p>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Dashboard
