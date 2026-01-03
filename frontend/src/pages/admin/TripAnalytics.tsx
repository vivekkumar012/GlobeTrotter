import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
    Legend
} from 'recharts';
import { Calendar, MapPin, Activity } from 'lucide-react';

const tripData = [
    { name: 'Jan', public: 400, private: 240 },
    { name: 'Feb', public: 300, private: 139 },
    { name: 'Mar', public: 200, private: 980 },
    { name: 'Apr', public: 278, private: 390 },
    { name: 'May', public: 189, private: 480 },
    { name: 'Jun', public: 239, private: 380 },
    { name: 'Jul', public: 349, private: 430 },
];

const destinationData = [
    { name: 'Paris', value: 400 },
    { name: 'Tokyo', value: 300 },
    { name: 'Bali', value: 300 },
    { name: 'New York', value: 200 },
    { name: 'London', value: 278 },
];

const activityData = [
    { name: 'Sightseeing', value: 400 },
    { name: 'Food & Dining', value: 300 },
    { name: 'Adventure', value: 300 },
    { name: 'Shopping', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export const TripAnalytics: React.FC = () => {
    const [timeRange, setTimeRange] = useState('6m');

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Trip Analytics</h1>
                    <p className="text-[var(--text-muted)]">Deep dive into travel trends and preferences.</p>
                </div>
                <div className="flex bg-[var(--bg-glass)] rounded-lg p-1 border border-white/10">
                    {['1m', '3m', '6m', '1y'].map((range) => (
                        <button
                            key={range}
                            onClick={() => setTimeRange(range)}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${timeRange === range
                                ? 'bg-[var(--primary)] text-white shadow-lg'
                                : 'text-[var(--text-muted)] hover:text-white'
                                }`}
                        >
                            {range}
                        </button>
                    ))}
                </div>
            </div>

            {/* Trip Trends */}
            <Card className="p-6 bg-[var(--bg-card)] border-white/10">
                <div className="flex items-center gap-2 mb-6">
                    <Calendar className="w-5 h-5 text-[var(--primary)]" />
                    <h3 className="text-lg font-bold text-white">Trip Creation Trends</h3>
                </div>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={tripData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                            <XAxis dataKey="name" stroke="#ffffff50" />
                            <YAxis stroke="#ffffff50" />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #ffffff20', borderRadius: '8px' }}
                                itemStyle={{ color: '#fff' }}
                            />
                            <Legend />
                            <Line type="monotone" dataKey="public" stroke="#3b82f6" strokeWidth={2} />
                            <Line type="monotone" dataKey="private" stroke="#10b981" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Destinations */}
                <Card className="p-6 bg-[var(--bg-card)] border-white/10">
                    <div className="flex items-center gap-2 mb-6">
                        <MapPin className="w-5 h-5 text-purple-500" />
                        <h3 className="text-lg font-bold text-white">Top Destinations</h3>
                    </div>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart layout="vertical" data={destinationData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                                <XAxis type="number" stroke="#ffffff50" />
                                <YAxis dataKey="name" type="category" stroke="#ffffff50" width={80} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #ffffff20', borderRadius: '8px' }}
                                    itemStyle={{ color: '#fff' }}
                                    cursor={{ fill: 'transparent' }}
                                />
                                <Bar dataKey="value" fill="#8b5cf6" radius={[0, 4, 4, 0]}>
                                    {destinationData.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* Popular Activities */}
                <Card className="p-6 bg-[var(--bg-card)] border-white/10">
                    <div className="flex items-center gap-2 mb-6">
                        <Activity className="w-5 h-5 text-orange-500" />
                        <h3 className="text-lg font-bold text-white">Popular Activities</h3>
                    </div>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={activityData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {activityData.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #ffffff20', borderRadius: '8px' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>
        </div>
    );
};
