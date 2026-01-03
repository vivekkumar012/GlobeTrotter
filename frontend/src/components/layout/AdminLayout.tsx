import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, BarChart3, LogOut, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export const AdminLayout: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (path: string) => location.pathname === path;

    const navItems = [
        { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Overview' },
        { path: '/admin/users', icon: Users, label: 'User Management' },
        { path: '/admin/analytics', icon: BarChart3, label: 'Trip Analytics' },
    ];

    return (
        <div className="min-h-screen bg-[var(--bg-dark)] flex">
            {/* Sidebar */}
            <aside className="w-64 bg-[var(--bg-card)] border-r border-white/10 flex flex-col fixed h-full z-20">
                <div className="p-6 border-b border-white/10">
                    <div className="flex items-center gap-2 text-[var(--primary)]">
                        <Globe className="w-8 h-8" />
                        <span className="text-xl font-bold text-white">GlobeTrotter</span>
                    </div>
                    <div className="mt-2 text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">
                        Admin Portal
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive(item.path)
                                    ? 'bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/20'
                                    : 'text-[var(--text-muted)] hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/10">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-[var(--text-muted)] hover:bg-white/5 hover:text-white transition-all duration-200"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Back to App</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8 overflow-y-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <Outlet />
                </motion.div>
            </main>
        </div>
    );
};
