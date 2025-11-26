import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Card from '../components/Card';
import { automationApi } from '../api/axios';

const Analytics = () => {
    const [stats, setStats] = useState({
        totalAutomations: 0,
        totalRuns: 0,
        successRate: '0%',
        avgDuration: '0s',
        errorRate: '0%'
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await automationApi.getStats();
                setStats(response.data);
            } catch (error) {
                console.error('Error fetching analytics:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    // Mock data for charts (since backend doesn't provide time-series data yet)
    const activityData = [
        { name: 'Mon', runs: 12 },
        { name: 'Tue', runs: 19 },
        { name: 'Wed', runs: 15 },
        { name: 'Thu', runs: 22 },
        { name: 'Fri', runs: 30 },
        { name: 'Sat', runs: 10 },
        { name: 'Sun', runs: 8 },
    ];

    const successData = [
        { name: 'Success', value: parseInt(stats.successRate) || 85 },
        { name: 'Error', value: 100 - (parseInt(stats.successRate) || 85) },
    ];

    const COLORS = ['#22C55E', '#EF4444'];

    if (loading) return <div className="p-8 text-center">Loading analytics...</div>;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark">Analytics</h1>
                <p className="text-text-secondary-light dark:text-text-secondary-dark mt-1">Deep dive into your automation performance</p>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="p-6">
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Total Executions</p>
                    <h3 className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark mt-2">{stats.totalRuns}</h3>
                    <p className="text-xs text-success mt-2">+12% from last week</p>
                </Card>
                <Card className="p-6">
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Success Rate</p>
                    <h3 className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark mt-2">{stats.successRate}</h3>
                    <p className="text-xs text-success mt-2">+2% from last week</p>
                </Card>
                <Card className="p-6">
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Avg Duration</p>
                    <h3 className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark mt-2">{stats.avgDuration}</h3>
                    <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-2">Stable</p>
                </Card>
                <Card className="p-6">
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Error Rate</p>
                    <h3 className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark mt-2">{stats.errorRate || '0%'}</h3>
                    <p className="text-xs text-success mt-2">-1% from last week</p>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Activity Chart */}
                <Card className="p-6">
                    <h3 className="font-semibold text-lg mb-6 text-text-primary-light dark:text-text-primary-dark">Weekly Activity</h3>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={activityData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.2} />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#9CA3AF', fontSize: 12 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#9CA3AF', fontSize: 12 }}
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                />
                                <Bar dataKey="runs" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={30} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* Success Rate Chart */}
                <Card className="p-6">
                    <h3 className="font-semibold text-lg mb-6 text-text-primary-light dark:text-text-primary-dark">Success vs Error</h3>
                    <div className="h-80 w-full flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={successData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={80}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {successData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center gap-6 mt-4">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-success"></div>
                            <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Success</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-error-light"></div>
                            <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Error</span>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Analytics;
