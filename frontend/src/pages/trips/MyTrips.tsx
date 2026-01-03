import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Calendar, MapPin, MoreVertical, Search } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { useNavigate } from 'react-router-dom';

export const MyTrips: React.FC = () => {
    const navigate = useNavigate();
    const [filter, setFilter] = useState('all');

    const trips = [
        {
            id: 1,
            name: 'Parisian Dreams',
            dates: 'Oct 15 - Oct 22, 2024',
            location: 'Paris, France',
            image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800',
            status: 'Upcoming',
            daysLeft: 12
        },
        {
            id: 2,
            name: 'Tokyo Adventure',
            dates: 'Dec 10 - Dec 24, 2024',
            location: 'Tokyo, Japan',
            image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=800',
            status: 'Planning',
            daysLeft: 68
        },
        {
            id: 3,
            name: 'Italian Summer',
            dates: 'Jul 10 - Jul 24, 2023',
            location: 'Rome, Italy',
            image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80&w=800',
            status: 'Completed',
            daysLeft: 0
        }
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="container mx-auto px-4 py-8 pb-24">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold mb-2">My Trips ✈️</h1>
                    <p className="text-[var(--text-muted)]">Manage your upcoming adventures and past memories.</p>
                </div>
                <Button onClick={() => navigate('/planner')}>
                    <Plus className="w-5 h-5 mr-2" /> Create New Trip
                </Button>
            </div>

            {/* Filters & Search */}
            <Card className="mb-8 p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <Input
                            placeholder="Search trips..."
                            icon={<Search className="w-5 h-5" />}
                            className="w-full"
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                        {['All', 'Upcoming', 'Planning', 'Completed'].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f.toLowerCase())}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${filter === f.toLowerCase()
                                    ? 'bg-[var(--primary)] text-[var(--bg-dark)]'
                                    : 'bg-white/5 text-[var(--text-muted)] hover:bg-white/10'
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>
            </Card>

            {/* Trips Grid */}
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                {trips.map((trip) => (
                    <motion.div key={trip.id} variants={item}>
                        <Card className="group cursor-pointer overflow-hidden p-0 h-full flex flex-col hover:border-[var(--primary)]/50 transition-colors">
                            <div className="h-48 overflow-hidden relative">
                                <img
                                    src={trip.image}
                                    alt={trip.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-3 right-3">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md ${trip.status === 'Upcoming' ? 'bg-green-500/20 text-green-400 border border-green-500/20' :
                                        trip.status === 'Planning' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/20' :
                                            'bg-gray-500/20 text-gray-400 border border-gray-500/20'
                                        }`}>
                                        {trip.status}
                                    </span>
                                </div>
                            </div>
                            <div className="p-5 flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-bold group-hover:text-[var(--primary)] transition-colors">{trip.name}</h3>
                                    <button className="text-[var(--text-muted)] hover:text-white p-1 rounded-full hover:bg-white/10">
                                        <MoreVertical className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="space-y-2 mb-4 flex-1">
                                    <div className="flex items-center text-[var(--text-muted)] text-sm">
                                        <Calendar className="w-4 h-4 mr-2" />
                                        {trip.dates}
                                    </div>
                                    <div className="flex items-center text-[var(--text-muted)] text-sm">
                                        <MapPin className="w-4 h-4 mr-2" />
                                        {trip.location}
                                    </div>
                                </div>
                                <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                                    {trip.daysLeft > 0 ? (
                                        <span className="text-sm font-medium text-[var(--primary)]">
                                            {trip.daysLeft} days to go
                                        </span>
                                    ) : (
                                        <span className="text-sm font-medium text-[var(--text-muted)]">
                                            Trip completed
                                        </span>
                                    )}
                                    <Button variant="ghost" size="sm" className="hover:bg-[var(--primary)]/10 hover:text-[var(--primary)]">
                                        View Details
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                ))}

                {/* Add New Trip Card */}
                <motion.div variants={item}>
                    <Card
                        className="h-full min-h-[300px] border-dashed border-2 flex flex-col items-center justify-center text-center p-8 cursor-pointer hover:bg-white/5 hover:border-[var(--primary)]/50 transition-all group"
                        onClick={() => navigate('/planner')}
                    >
                        <div className="w-16 h-16 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Plus className="w-8 h-8 text-[var(--primary)]" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Plan a New Trip</h3>
                        <p className="text-[var(--text-muted)] max-w-xs">
                            Start planning your next adventure.
                        </p>
                    </Card>
                </motion.div>
            </motion.div>
        </div>
    );
};
