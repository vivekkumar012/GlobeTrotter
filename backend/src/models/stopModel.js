import mongoose from 'mongoose';

const stopSchema = new mongoose.Schema({
    tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip' },
    city: { type: String, required: true },
    arrivalDate: Date,
    departureDate: Date,
    activities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Activity' }],
    stopBudget: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Stop', stopSchema);