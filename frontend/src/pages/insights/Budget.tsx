import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, PieChart, TrendingUp, AlertCircle, ArrowDownRight } from 'lucide-react';
import { Card } from '../../components/ui/Card';

export const Budget: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-8 pb-24">
            <h1 className="text-3xl font-bold mb-8">Trip Budget 💰</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="bg-gradient-to-br from-green-500/20 to-green-600/20 border-green-500/20">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 rounded-xl bg-green-500/20 text-green-400">
                            <DollarSign className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-bold px-2 py-1 rounded-full bg-green-500/20 text-green-400">
                            On Track
                        </span>
                    </div>
                    <p className="text-[var(--text-muted)] text-sm mb-1">Total Budget</p>
                    <h3 className="text-3xl font-bold">$3,500.00</h3>
                </Card>

                <Card className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-blue-500/20">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 rounded-xl bg-blue-500/20 text-blue-400">
                            <PieChart className="w-6 h-6" />
                        </div>
                    </div>
                    <p className="text-[var(--text-muted)] text-sm mb-1">Spent So Far</p>
                    <h3 className="text-3xl font-bold">$1,250.00</h3>
                </Card>

                <Card className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border-purple-500/20">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 rounded-xl bg-purple-500/20 text-purple-400">
                            <TrendingUp className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-bold px-2 py-1 rounded-full bg-purple-500/20 text-purple-400">
                            35% Used
                        </span>
                    </div>
                    <p className="text-[var(--text-muted)] text-sm mb-1">Remaining</p>
                    <h3 className="text-3xl font-bold">$2,250.00</h3>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Breakdown */}
                <Card>
                    <h3 className="text-xl font-bold mb-6">Expense Breakdown</h3>
                    <div className="space-y-6">
                        {[
                            { label: 'Accommodation', amount: '$850', percent: 45, color: 'bg-blue-500' },
                            { label: 'Flights', amount: '$300', percent: 25, color: 'bg-purple-500' },
                            { label: 'Food & Dining', amount: '$100', percent: 15, color: 'bg-orange-500' },
                            { label: 'Activities', amount: '$0', percent: 0, color: 'bg-gray-500' },
                        ].map((item) => (
                            <div key={item.label}>
                                <div className="flex justify-between text-sm mb-2">
                                    <span>{item.label}</span>
                                    <span className="font-bold">{item.amount}</span>
                                </div>
                                <div className="w-full bg-white/5 rounded-full h-2">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${item.percent}%` }}
                                        transition={{ duration: 1, ease: "easeOut" }}
                                        className={`h-2 rounded-full ${item.color}`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Recent Transactions */}
                <Card>
                    <h3 className="text-xl font-bold mb-6">Recent Transactions</h3>
                    <div className="space-y-4">
                        {[
                            { name: 'Hotel Booking', date: 'Oct 10', amount: '$850.00', category: 'Stay' },
                            { name: 'Flight Deposit', date: 'Oct 05', amount: '$300.00', category: 'Travel' },
                            { name: 'Dinner at Le Petit', date: 'Oct 15', amount: '$100.00', category: 'Food' },
                        ].map((tx, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 rounded-full bg-white/5">
                                        <ArrowDownRight className="w-4 h-4 text-[var(--text-muted)]" />
                                    </div>
                                    <div>
                                        <p className="font-bold">{tx.name}</p>
                                        <p className="text-xs text-[var(--text-muted)]">{tx.date} • {tx.category}</p>
                                    </div>
                                </div>
                                <span className="font-bold text-red-400">-{tx.amount}</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex gap-3">
                        <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                        <p className="text-sm text-yellow-200">
                            You've spent 15% of your food budget. Consider looking for cheaper dining options for the next few days.
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    );
};
