import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search as SearchIcon, MapPin, Star, Plus, Filter } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';

export const Search: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'cities' | 'activities'>('cities');

    const results = [
        {
            id: 1,
            title: 'Louvre Museum',
            location: 'Paris, France',
            rating: 4.8,
            reviews: '12k',
            image: 'https://images.unsplash.com/photo-1499856871940-a09627c6dcf6?auto=format&fit=crop&q=80&w=400',
            category: 'Museum',
            price: '$$'
        },
        {
            id: 2,
            title: 'Eiffel Tower',
            location: 'Paris, France',
            rating: 4.9,
            reviews: '45k',
            image: 'https://images.unsplash.com/photo-1543349689-9a4d426bee8e?auto=format&fit=crop&q=80&w=400',
            category: 'Landmark',
            price: '$$$'
        },
        {
            id: 3,
            title: 'Montmartre',
            location: 'Paris, France',
            rating: 4.7,
            reviews: '8k',
            image: 'https://images.unsplash.com/photo-1550355191-aa8a80b41353?auto=format&fit=crop&q=80&w=400',
            category: 'Neighborhood',
            price: 'Free'
        }
    ];

    return (
        <div className="container mx-auto px-4 py-8 pb-24">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-4">Discover Your Next Stop 🗺️</h1>
                    <div className="flex gap-4 max-w-xl mx-auto">
                        <Input
                            placeholder="Search for places, activities, or food..."
                            icon={<SearchIcon className="w-5 h-5" />}
                            className="flex-1"
                        />
                        <Button variant="outline" className="px-3">
                            <Filter className="w-5 h-5" />
                        </Button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex justify-center gap-2 mb-8">
                    <button
                        onClick={() => setActiveTab('cities')}
                        className={`px-6 py-2 rounded-full font-medium transition-all ${activeTab === 'cities'
                                ? 'bg-[var(--primary)] text-[var(--bg-dark)]'
                                : 'bg-white/5 hover:bg-white/10'
                            }`}
                    >
                        Cities
                    </button>
                    <button
                        onClick={() => setActiveTab('activities')}
                        className={`px-6 py-2 rounded-full font-medium transition-all ${activeTab === 'activities'
                                ? 'bg-[var(--primary)] text-[var(--bg-dark)]'
                                : 'bg-white/5 hover:bg-white/10'
                            }`}
                    >
                        Activities
                    </button>
                </div>

                {/* Results */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {results.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="p-0 overflow-hidden group h-full flex flex-col">
                                <div className="h-48 overflow-hidden relative">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" /> {item.rating}
                                    </div>
                                </div>
                                <div className="p-5 flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="text-lg font-bold group-hover:text-[var(--primary)] transition-colors">{item.title}</h3>
                                            <div className="flex items-center text-sm text-[var(--text-muted)]">
                                                <MapPin className="w-3 h-3 mr-1" />
                                                {item.location}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="px-2 py-1 rounded-md bg-white/5 text-xs border border-white/5">
                                            {item.category}
                                        </span>
                                        <span className="text-xs text-[var(--text-muted)]">•</span>
                                        <span className="text-xs text-[var(--text-muted)]">{item.reviews} reviews</span>
                                    </div>
                                    <div className="mt-auto pt-4 border-t border-white/10 flex justify-between items-center">
                                        <span className="font-bold">{item.price}</span>
                                        <Button size="sm" variant="ghost" className="hover:bg-[var(--primary)]/10 hover:text-[var(--primary)]">
                                            <Plus className="w-4 h-4 mr-1" /> Add
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};
