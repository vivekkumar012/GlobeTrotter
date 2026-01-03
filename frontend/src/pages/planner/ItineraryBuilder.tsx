import React, { useState } from 'react';
import { Plus, DollarSign, MoreVertical, GripVertical } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';

export const ItineraryBuilder: React.FC = () => {
    const [days] = useState([
        {
            id: 1,
            date: 'Oct 15',
            activities: [
                { id: 1, time: '10:00 AM', title: 'Eiffel Tower Visit', type: 'Sightseeing', cost: '$30' },
                { id: 2, time: '01:00 PM', title: 'Lunch at Le Jules Verne', type: 'Dining', cost: '$120' }
            ]
        },
        {
            id: 2,
            date: 'Oct 16',
            activities: []
        }
    ]);

    return (
        <div className="container mx-auto px-4 py-8 pb-24">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Paris Itinerary</h1>
                    <p className="text-[var(--text-muted)]">Oct 15 - Oct 22, 2024</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">Share</Button>
                    <Button>Save Changes</Button>
                </div>
            </div>

            <div className="flex gap-6 overflow-x-auto pb-4 mb-8">
                {days.map((day) => (
                    <button
                        key={day.id}
                        className="flex-shrink-0 px-6 py-3 rounded-xl bg-[var(--bg-glass)] border border-white/10 hover:bg-white/10 transition-colors text-center min-w-[100px]"
                    >
                        <span className="block text-sm text-[var(--text-muted)]">Day {day.id}</span>
                        <span className="block font-bold">{day.date}</span>
                    </button>
                ))}
                <button className="flex-shrink-0 px-6 py-3 rounded-xl border border-dashed border-white/20 hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors flex items-center justify-center min-w-[100px]">
                    <Plus className="w-5 h-5" />
                </button>
            </div>

            <div className="space-y-6">
                {days.map((day) => (
                    <div key={day.id} className="relative pl-8 border-l border-white/10">
                        <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-[var(--primary)] flex items-center justify-center text-[var(--bg-dark)] font-bold text-xs">
                            {day.id}
                        </div>

                        <div className="mb-4 flex justify-between items-center">
                            <h3 className="text-xl font-bold">{day.date}</h3>
                            <Button variant="ghost" size="sm" className="text-[var(--primary)]">
                                <Plus className="w-4 h-4 mr-1" /> Add Activity
                            </Button>
                        </div>

                        <div className="space-y-4">
                            {day.activities.length > 0 ? (
                                day.activities.map((activity) => (
                                    <Card key={activity.id} className="p-4 flex items-center gap-4 group">
                                        <div className="cursor-grab text-[var(--text-muted)] hover:text-white">
                                            <GripVertical className="w-5 h-5" />
                                        </div>
                                        <div className="w-20 text-sm font-medium text-[var(--text-muted)]">
                                            {activity.time}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold">{activity.title}</h4>
                                            <div className="flex items-center gap-3 text-sm text-[var(--text-muted)] mt-1">
                                                <span className="px-2 py-0.5 rounded-full bg-white/10 text-xs">
                                                    {activity.type}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <DollarSign className="w-3 h-3" /> {activity.cost}
                                                </span>
                                            </div>
                                        </div>
                                        <button className="p-2 rounded-full hover:bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <MoreVertical className="w-4 h-4" />
                                        </button>
                                    </Card>
                                ))
                            ) : (
                                <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center text-[var(--text-muted)]">
                                    <p>No activities planned for this day.</p>
                                    <Button variant="ghost" className="mt-2 text-[var(--primary)]">
                                        Browse Activities
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
