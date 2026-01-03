import Stop from '../models/stopModel.js';
import Trip from '../models/tripModel.js';
import Activity from '../models/activityModel.js';

/**
 * @desc    Add a new city/stop to a trip
 * @route   POST /api/v1/stops
 */
export const addStop = async (req, res) => {
    try {
        const { tripId, city, arrivalDate, departureDate, lodging } = req.body;

        // 1. Validation
        if (!tripId || !city) {
            return res.status(400).json({
                success: false,
                message: "Trip ID and City name are required."
            });
        }

        // 2. Create the Stop
        const newStop = await Stop.create({
            tripId,
            city,
            arrivalDate,
            departureDate,
            lodging
        });

        // 3. Link this stop to the Trip document
        await Trip.findByIdAndUpdate(tripId, {
            $push: { stops: newStop._id }
        });

        res.status(201).json({
            success: true,
            message: `Stop in ${city} added successfully.`,
            data: newStop
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error adding stop.",
            error: error.message
        });
    }
};

/**
 * @desc    Get all stops for a specific trip
 * @route   GET /api/v1/stops/trip/:tripId
 */
export const getStopsByTrip = async (req, res) => {
    try {
        const { tripId } = req.params;
        
        // Find all stops for this trip and sort by arrival date
        const stops = await Stop.find({ tripId }).sort({ arrivalDate: 1 });

        res.status(200).json({
            success: true,
            count: stops.length,
            data: stops
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Delete a stop and clean up budgets/activities
 * @route   DELETE /api/v1/stops/:id
 */
export const deleteStop = async (req, res) => {
    try {
        const { id } = req.params;

        // 1. Find the stop to get the tripId and budget
        const stop = await Stop.findById(id);
        if (!stop) {
            return res.status(404).json({ success: false, message: "Stop not found." });
        }

        // 2. Subtract this stop's total budget from the Trip's total budget
        await Trip.findByIdAndUpdate(stop.tripId, {
            $pull: { stops: id },
            $inc: { totalTripBudget: -Number(stop.stopBudget) }
        });

        // 3. Delete all activities associated with this specific stop
        await Activity.deleteMany({ stopId: id });

        // 4. Delete the stop document
        await Stop.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Stop and its activities removed, budget recalculated."
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting stop.",
            error: error.message
        });
    }
};