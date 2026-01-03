import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Share2, Copy, Heart } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';

export const SharedItinerary: React.FC = () => {
    return (
        <div className="min-h-screen bg-[var(--bg-dark)]">
            {/* Hero Section */}
            <div className="relative h-[50vh] min-h-[400px]">
                <img
                    src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=2000"
                    alt="Paris"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-dark)] via-[var(--bg-dark)]/40 to-transparent" />

                <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
                    <div className="container mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="flex items-center gap-3 text-white/90 mb-4 backdrop-blur-md bg-black/30 w-fit px-4 py-2 rounded-full border border-white/10">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-xs font-bold">SJ</div>
                                <span>Planned by <strong>Bharat Jenkins</strong></span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg">Parisian Dreams 🇫🇷</h1>
                            <div className="flex flex-wrap gap-4">
                                <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center gap-2 text-white font-medium hover:bg-white/20 transition-colors cursor-default">
                                    <Calendar className="w-4 h-4" /> 7 Days
                                </span>
                                <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center gap-2 text-white font-medium hover:bg-white/20 transition-colors cursor-default">
                                    <MapPin className="w-4 h-4" /> 12 Stops
                                </span>
                                <button className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center gap-2 text-white font-medium hover:bg-red-500/20 hover:border-red-500/50 hover:text-red-400 transition-all group">
                                    <Heart className="w-4 h-4 group-hover:fill-red-400 transition-colors" /> 1.2k Likes
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 pb-24">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Main Content */}
                    <div className="flex-1 space-y-12">
                        <div className="flex justify-between items-center">
                            <h2 className="text-3xl font-bold">Itinerary Overview</h2>
                            <div className="flex gap-3">
                                <Button variant="outline" className="gap-2"><Share2 className="w-4 h-4" /> Share</Button>
                                <Button className="gap-2 shadow-lg shadow-[var(--primary)]/20"><Copy className="w-4 h-4" /> Copy Trip</Button>
                            </div>
                        </div>

                        {[1, 2, 3].map((day) => (
                            <motion.div
                                key={day}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="relative pl-12 border-l-2 border-white/10 pb-12 last:pb-0"
                            >
                                <div className="absolute -left-[13px] top-0 w-6 h-6 rounded-full bg-[var(--primary)] flex items-center justify-center text-[var(--bg-dark)] font-bold text-xs ring-4 ring-[var(--bg-dark)]">
                                    {day}
                                </div>
                                <h3 className="text-2xl font-bold mb-6">Day {day}</h3>
                                <div className="space-y-6">
                                    <Card className="p-0 overflow-hidden flex flex-col md:flex-row gap-0 group hover:border-[var(--primary)]/30 transition-colors">
                                        <div className="w-full md:w-48 h-48 md:h-auto relative overflow-hidden">
                                            <img
                                                src="https://images.unsplash.com/photo-1543349689-9a4d426bee8e?auto=format&fit=crop&q=80&w=400"
                                                alt="Activity"
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                        </div>
                                        <div className="p-6 flex-1">
                                            <span className="text-sm font-bold text-[var(--primary)] mb-2 block">10:00 AM</span>
                                            <h4 className="text-xl font-bold mb-2">Visit the Louvre</h4>
                                            <p className="text-[var(--text-muted)] mb-4 leading-relaxed">
                                                Explore the world's largest art museum and a historic monument in Paris. Don't miss the Mona Lisa!
                                            </p>
                                            <div className="flex gap-2">
                                                <span className="px-2 py-1 rounded-md bg-white/5 text-xs border border-white/5">Sightseeing</span>
                                                <span className="px-2 py-1 rounded-md bg-white/5 text-xs border border-white/5">2-3 Hours</span>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:w-80 space-y-8">
                        <Card className="sticky top-24">
                            <h3 className="font-bold text-lg mb-6">Trip Summary</h3>
                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between py-2 border-b border-white/5">
                                    <span className="text-[var(--text-muted)]">Est. Cost</span>
                                    <span className="font-bold text-lg">$2,450</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-white/5">
                                    <span className="text-[var(--text-muted)]">Transport</span>
                                    <span className="font-bold">Metro & Walk</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-white/5">
                                    <span className="text-[var(--text-muted)]">Pace</span>
                                    <span className="font-bold">Moderate</span>
                                </div>
                            </div>
                            <Button className="w-full mt-8 py-6 text-lg font-bold shadow-xl shadow-[var(--primary)]/20">
                                Copy to My Trips
                            </Button>
                        </Card>

                        <Card>
                            <h3 className="font-bold mb-4">Tags</h3>
                            <div className="flex flex-wrap gap-2">
                                {['Culture', 'Foodie', 'Art', 'History', 'Romantic', 'Photography'].map((tag) => (
                                    <span key={tag} className="px-3 py-1.5 rounded-lg bg-white/5 text-xs border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};
