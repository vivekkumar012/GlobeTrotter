import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
    stopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Stop' },
    tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip' }, // Helpful for global budget lookup
    name: { type: String, required: true },
    cost: { type: Number, default: 0 },
    category: { type: String, enum: ['Food', 'Transport', 'Sightseeing', 'Shopping', 'Other'] },
    timeSlot: String,
    description: String
}, { timestamps: true });

export default mongoose.model('Activity', activitySchema);