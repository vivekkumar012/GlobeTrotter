// Activity
// controllers/activityController.js
import Activity from '../models/activityModel.js';
import Stop from '../models/activityModel.js';
import Trip from '../models/tripModel.js';

export const addActivity = async (req, res) => {
    try {
        const { stopId, tripId, name, activityCost, category } = req.body;

        // 1. Create the Activity document
        const newActivity = await Activity.create({
            stopId,
            tripId,
            name,
            activityCost: Number(activityCost),
            category
        });

        // 2. Update Stopage Budget (Relational Link 1)
        await Stop.findByIdAndUpdate(stopId, {
            $push: { activities: newActivity._id },
            $inc: { stopBudget: Number(activityCost) }
        });

        // 3. Update Total Trip Budget (Relational Link 2)
        await Trip.findByIdAndUpdate(tripId, {
            $inc: { totalTripBudget: Number(activityCost) }
        });

        res.status(201).json({ success: true, message: "Budget updated across all levels", data: newActivity });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

/**
 * @desc    Remove an activity and recalculate budgets
 * @route   DELETE /api/v1/stops/activity/:id
 * @access  Private
 */
export const deleteActivity = async (req, res) => {
    try {
        const { id } = req.params;

        // 1. Find the activity to get its cost and parent IDs
        const activity = await Activity.findById(id);
        if (!activity) {
            return res.status(404).json({
                success: false,
                message: "Activity not found."
            });
        }

        const { stopId, tripId, activityCost } = activity;

        // 2. Subtract cost from Stop level
        await Stop.findByIdAndUpdate(stopId, {
            $pull: { activities: id },
            $inc: { stopBudget: -Number(activityCost) }
        });

        // 3. Subtract cost from Trip level
        await Trip.findByIdAndUpdate(tripId, {
            $inc: { totalTripBudget: -Number(activityCost) }
        });

        // 4. Finally, delete the activity document
        await Activity.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Activity removed and budgets recalculated successfully."
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete activity.",
            error: error.message
        });
    }
};

/**
 * @desc    Get budget breakdown for a specific trip
 * @route   GET /api/v1/trips/:tripId/budget-breakdown
 * @access  Private
 */
export const getBudgetAnalytics = async (req, res) => {
    try {
        const { tripId } = req.params;

        // Aggregation pipeline to group costs by category
        const stats = await Activity.aggregate([
            { $match: { tripId: new mongoose.Types.ObjectId(tripId) } },
            {
                $group: {
                    _id: "$category",
                    totalAmount: { $sum: "$activityCost" },
                    activityCount: { $sum: 1 }
                }
            },
            { $sort: { totalAmount: -1 } } // Highest spending first
        ]);

        res.status(200).json({
            success: true,
            data: stats
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Could not generate budget analytics.",
            error: error.message
        });
    }
};