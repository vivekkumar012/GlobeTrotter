import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from '../../components/ui/Card';

export const CalendarView: React.FC = () => {
    const events = [
        { day: 15, title: 'Arrival in Paris', type: 'travel', start: 1, duration: 1 },
        { day: 16, title: 'Louvre Museum', type: 'activity', start: 2, duration: 1 },
        { day: 17, title: 'Versailles Day Trip', type: 'activity', start: 3, duration: 1 },
        { day: 18, title: 'Free Day', type: 'leisure', start: 4, duration: 1 },
    ];

    return (
        <div className="container mx-auto px-4 py-8 pb-24">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Trip Timeline 📅</h1>
                <div className="flex items-center gap-4">
                    <button className="p-2 hover:bg-white/10 rounded-full transition-colors"><ChevronLeft className="w-5 h-5" /></button>
                    <span className="font-bold text-lg">October 2024</span>
                    <button className="p-2 hover:bg-white/10 rounded-full transition-colors"><ChevronRight className="w-5 h-5" /></button>
                </div>
            </div>

            <Card className="overflow-hidden">
                <div className="grid grid-cols-7 gap-px bg-white/10 border-b border-white/10">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                        <div key={day} className="p-4 text-center text-sm font-bold text-[var(--text-muted)] bg-[var(--bg-card)]">
                            {day}
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-7 gap-px bg-white/10">
                    {Array.from({ length: 35 }).map((_, i) => {
                        const day = i - 1; // Offset for starting day
                        const isCurrentMonth = day > 0 && day <= 31;
                        const event = events.find(e => e.day === day);

                        return (
                            <div key={i} className={`min-h-[120px] p-2 bg-[var(--bg-card)] ${!isCurrentMonth ? 'opacity-50' : ''}`}>
                                {isCurrentMonth && (
                                    <>
                                        <span className={`text-sm font-medium ${day === 15 ? 'text-[var(--primary)]' : ''}`}>
                                            {day}
                                        </span>
                                        {event && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className={`mt-2 p-2 rounded-lg text-xs font-bold truncate cursor-pointer hover:opacity-80 transition-opacity ${event.type === 'travel' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/20' :
                                                        event.type === 'activity' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/20' :
                                                            'bg-green-500/20 text-green-400 border border-green-500/20'
                                                    }`}
                                            >
                                                {event.title}
                                            </motion.div>
                                        )}
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>
            </Card>
        </div>
    );
};
