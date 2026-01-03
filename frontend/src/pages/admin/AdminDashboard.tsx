import React from 'react';
import { Card } from '../../components/ui/Card';
import {
    Users,
    Map,
    TrendingUp,
    DollarSign,
    Activity,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar
} from 'recharts';

const data = [
    { name: 'Jan', users: 400, trips: 240, revenue: 2400 },
    { name: 'Feb', users: 300, trips: 139, revenue: 2210 },
    { name: 'Mar', users: 200, trips: 980, revenue: 2290 },
    { name: 'Apr', users: 278, trips: 390, revenue: 2000 },
    { name: 'May', users: 189, trips: 480, revenue: 2181 },
    { name: 'Jun', users: 239, trips: 380, revenue: 2500 },
    { name: 'Jul', users: 349, trips: 430, revenue: 2100 },
];

const recentActivity = [
    { id: 1, user: "Sarah Johnson", action: "Created a new trip", target: "Bali Adventure", time: "2 mins ago" },
    { id: 2, user: "Mike Chen", action: "Joined", target: "Platform", time: "15 mins ago" },
    { id: 3, user: "Emma Wilson", action: "Published", target: "Swiss Alps Guide", time: "1 hour ago" },
    { id: 4, user: "Alex Turner", action: "Updated profile", target: "", time: "2 hours ago" },
];

export const AdminDashboard: React.FC = () => {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
                <p className="text-[var(--text-muted)]">Welcome back, Admin. Here's what's happening today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="p-6 bg-[var(--bg-card)] border-white/10">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-blue-500/10 rounded-xl">
                            <Users className="w-6 h-6 text-blue-500" />
                        </div>
                        <span className="flex items-center text-green-500 text-sm font-medium bg-green-500/10 px-2 py-1 rounded-lg">
                            +12.5% <ArrowUpRight className="w-4 h-4 ml-1" />
                        </span>
                    </div>
                    <h3 className="text-[var(--text-muted)] text-sm font-medium mb-1">Total Users</h3>
                    <p className="text-2xl font-bold text-white">24,582</p>
                </Card>

                <Card className="p-6 bg-[var(--bg-card)] border-white/10">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-purple-500/10 rounded-xl">
                            <Map className="w-6 h-6 text-purple-500" />
                        </div>
                        <span className="flex items-center text-green-500 text-sm font-medium bg-green-500/10 px-2 py-1 rounded-lg">
                            +8.2% <ArrowUpRight className="w-4 h-4 ml-1" />
                        </span>
                    </div>
                    <h3 className="text-[var(--text-muted)] text-sm font-medium mb-1">Active Trips</h3>
                    <p className="text-2xl font-bold text-white">1,432</p>
                </Card>

                <Card className="p-6 bg-[var(--bg-card)] border-white/10">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-orange-500/10 rounded-xl">
                            <TrendingUp className="w-6 h-6 text-orange-500" />
                        </div>
                        <span className="flex items-center text-red-500 text-sm font-medium bg-red-500/10 px-2 py-1 rounded-lg">
                            -2.4% <ArrowDownRight className="w-4 h-4 ml-1" />
                        </span>
                    </div>
                    <h3 className="text-[var(--text-muted)] text-sm font-medium mb-1">Engagement Rate</h3>
                    <p className="text-2xl font-bold text-white">64.2%</p>
                </Card>

                <Card className="p-6 bg-[var(--bg-card)] border-white/10">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-green-500/10 rounded-xl">
                            <DollarSign className="w-6 h-6 text-green-500" />
                        </div>
                        <span className="flex items-center text-green-500 text-sm font-medium bg-green-500/10 px-2 py-1 rounded-lg">
                            +18.2% <ArrowUpRight className="w-4 h-4 ml-1" />
                        </span>
                    </div>
                    <h3 className="text-[var(--text-muted)] text-sm font-medium mb-1">Total Revenue</h3>
                    <p className="text-2xl font-bold text-white">$48,294</p>
                </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6 bg-[var(--bg-card)] border-white/10">
                    <h3 className="text-lg font-bold text-white mb-6">User Growth & Trips</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorTrips" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                                <XAxis dataKey="name" stroke="#ffffff50" />
                                <YAxis stroke="#ffffff50" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #ffffff20', borderRadius: '8px' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Area type="monotone" dataKey="users" stroke="#3b82f6" fillOpacity={1} fill="url(#colorUsers)" />
                                <Area type="monotone" dataKey="trips" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorTrips)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card className="p-6 bg-[var(--bg-card)] border-white/10">
                    <h3 className="text-lg font-bold text-white mb-6">Revenue Overview</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                                <XAxis dataKey="name" stroke="#ffffff50" />
                                <YAxis stroke="#ffffff50" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #ffffff20', borderRadius: '8px' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>

            {/* Recent Activity */}
            <Card className="p-6 bg-[var(--bg-card)] border-white/10">
                <h3 className="text-lg font-bold text-white mb-6">Recent Activity</h3>
                <div className="space-y-4">
                    {recentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                                    {activity.user.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-white font-medium">
                                        {activity.user} <span className="text-[var(--text-muted)] font-normal">{activity.action}</span> <span className="text-[var(--primary)]">{activity.target}</span>
                                    </p>
                                    <p className="text-xs text-[var(--text-muted)]">{activity.time}</p>
                                </div>
                            </div>
                            <Activity className="w-4 h-4 text-[var(--text-muted)]" />
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};
