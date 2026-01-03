import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Image as ImageIcon, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { useNavigate } from 'react-router-dom';

export const CreateTrip: React.FC = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            navigate('/planner/edit');
        }, 1500);
    };

    return (
        <div className="container mx-auto px-4 py-8 pb-24">
            <div className="max-w-2xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-3xl md:text-4xl font-bold mb-3">Plan Your Next Escape ✈️</h1>
                    <p className="text-[var(--text-muted)]">
                        Tell us a bit about your dream trip, and we'll help you make it happen.
                    </p>
                </motion.div>

                <Card className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Input
                            label="Trip Name"
                            placeholder="e.g., Summer in Amalfi Coast"
                            icon={<MapPin className="w-5 h-5" />}
                            required
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                label="Start Date"
                                type="date"
                                icon={<Calendar className="w-5 h-5" />}
                                required
                            />
                            <Input
                                label="End Date"
                                type="date"
                                icon={<Calendar className="w-5 h-5" />}
                                required
                            />
                        </div>

                        <Input
                            label="Destination"
                            placeholder="Where are you going?"
                            icon={<MapPin className="w-5 h-5" />}
                            required
                        />

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-muted)] mb-1.5 ml-1">
                                Description (Optional)
                            </label>
                            <textarea
                                className="w-full bg-[var(--bg-glass)] border border-white/10 rounded-xl px-4 py-3 text-[var(--text-main)] placeholder-[var(--text-muted)]/50 focus:outline-none focus:border-[var(--primary)]/50 focus:ring-2 focus:ring-[var(--primary)]/20 transition-all duration-300 min-h-[120px] hover:bg-white/5"
                                placeholder="What's the vibe? Relaxing, adventurous, foodie tour?"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-muted)] mb-1.5 ml-1">
                                Cover Photo
                            </label>
                            <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-[var(--primary)]/50 hover:bg-[var(--primary)]/5 transition-all cursor-pointer group">
                                <div className="w-12 h-12 rounded-full bg-[var(--bg-glass)] flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                                    <ImageIcon className="w-6 h-6 text-[var(--text-muted)] group-hover:text-[var(--primary)]" />
                                </div>
                                <p className="text-sm font-medium">Click to upload or drag and drop</p>
                                <p className="text-xs text-[var(--text-muted)] mt-1">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                            </div>
                        </div>

                        <div className="pt-4">
                            <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
                                Start Planning <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
};
