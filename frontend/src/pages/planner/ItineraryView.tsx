import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, Download, MapPin, DollarSign, Calendar, MoreVertical, Grid, List } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';

export const ItineraryView: React.FC = () => {
    const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

    const days = [
        {
            id: 1,
            date: 'Oct 15',
            title: 'Arrival & Exploration',
            activities: [
                { id: 1, time: '10:00 AM', title: 'Check-in at Hotel', type: 'Logistics', cost: '$0', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=200' },
                { id: 2, time: '12:00 PM', title: 'Lunch at Le Petit', type: 'Dining', cost: '$45', image: 'https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?auto=format&fit=crop&q=80&w=200' },
                { id: 3, time: '02:00 PM', title: 'Eiffel Tower Visit', type: 'Sightseeing', cost: '$30', image: 'https://images.unsplash.com/photo-1543349689-9a4d426bee8e?auto=format&fit=crop&q=80&w=200' }
            ]
        },
        {
            id: 2,
            date: 'Oct 16',
            title: 'Art & Culture',
            activities: [
                { id: 4, time: '09:00 AM', title: 'Louvre Museum', type: 'Sightseeing', cost: '$20', image: 'https://images.unsplash.com/photo-1499856871940-a09627c6dcf6?auto=format&fit=crop&q=80&w=200' },
                { id: 5, time: '01:00 PM', title: 'Seine River Cruise', type: 'Activity', cost: '$25', image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=200' }
            ]
        }
    ];

    return (
        <div className="container mx-auto px-4 py-8 pb-24">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Parisian Dreams 🇫🇷</h1>
                    <div className="flex items-center gap-4 text-[var(--text-muted)]">
                        <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Oct 15 - Oct 22</span>
                        <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> Paris, France</span>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}>
                        {viewMode === 'list' ? <Grid className="w-4 h-4" /> : <List className="w-4 h-4" />}
                    </Button>
                    <Button variant="outline"><Share2 className="w-4 h-4 mr-2" /> Share</Button>
                    <Button><Download className="w-4 h-4 mr-2" /> Export</Button>
                </div>
            </div>

            {/* Itinerary Content */}
            <div className="space-y-8">
                {days.map((day) => (
                    <motion.div
                        key={day.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-[var(--primary)] flex flex-col items-center justify-center text-[var(--bg-dark)] font-bold shadow-lg shadow-orange-500/20">
                                <span className="text-xs uppercase">Day</span>
                                <span className="text-xl leading-none">{day.id}</span>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">{day.date}</h2>
                                <p className="text-[var(--text-muted)]">{day.title}</p>
                            </div>
                        </div>

                        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-4'}>
                            {day.activities.map((activity) => (
                                <Card key={activity.id} className="group hover:border-[var(--primary)]/30 transition-colors">
                                    <div className="flex gap-4">
                                        <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                                            <img
                                                src={activity.image}
                                                alt={activity.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="flex-1 py-1">
                                            <div className="flex justify-between items-start mb-1">
                                                <span className="text-sm font-bold text-[var(--primary)]">{activity.time}</span>
                                                <button className="text-[var(--text-muted)] hover:text-white">
                                                    <MoreVertical className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <h3 className="font-bold mb-1">{activity.title}</h3>
                                            <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
                                                <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/5">
                                                    {activity.type}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <DollarSign className="w-3 h-3" /> {activity.cost}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
