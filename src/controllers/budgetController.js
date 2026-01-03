//Budgetimport mongoose from 'mongoose';
import Trip from '../models/tripModel.js';
import Stop from '../models/stopModel.js';
import Activity from '../models/activityModel.js';

// 1. Get cost by category (For Pie Charts)
export const getBreakdown = async (req, res) => {
    try {
        const { tripId } = req.params;

        const data = await Activity.aggregate([
            { $match: { tripId: new mongoose.Types.ObjectId(tripId) } },
            {
                $group: {
                    _id: "$category",
                    total: { $sum: "$activityCost" }
                }
            }
        ]);

        res.status(200).json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 2. Get cost by city (For Bar Charts)
export const getStopCosts = async (req, res) => {
    try {
        const { tripId } = req.params;

        const data = await Stop.find({ tripId })
            .select('city stopBudget')
            .sort({ arrivalDate: 1 });

        res.status(200).json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 3. Check if trip is over budget
export const checkLimit = async (req, res) => {
    try {
        const { tripId } = req.params;
        const { limit } = req.query; // Example: /check-limit/123?limit=1000

        const trip = await Trip.findById(tripId).select('totalTripBudget');

        const isOver = trip.totalTripBudget > Number(limit);

        res.status(200).json({
            success: true,
            total: trip.totalTripBudget,
            isOver,
            diff: isOver ? trip.totalTripBudget - Number(limit) : 0
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};