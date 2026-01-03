// Trip COntroller
import Trip from "../models/tripModel.js";
import User from "../models/userModel.js";

import Stop from "../models/stopModel.js";
import Activity from "../models/activityModel.js";
export const createTrip = async (req, res) => {
  try {
    const { title, description, startDate, endDate, coverImage } = req.body;

    // 1. Validation
    if (!title || !startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide a title, start date, and end date for your trip.",
      });
    }

    // 2. Create the trip (Linked to req.user.id from auth middleware)
    const newTrip = await Trip.create({
      title,
      description,
      startDate,
      endDate,
      coverImage,
      owner: req.user.id,
    });

    // 3. Update the User's trip list
    await User.findByIdAndUpdate(req.user.id, {
      $push: { trips: newTrip._id },
    });

    res.status(201).json({
      success: true,
      message: "Trip created successfully! Time to add some stops.",
      data: newTrip,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create trip.",
      error: error.message,
    });
  }
};

export const getMyTrips = async (req, res) => {
  try {
    // Find trips where owner matches logged-in user ID
    const trips = await Trip.find({ owner: req.user.id }).sort({
      createdAt: -1,
    }); // Show newest trips first

    res.status(200).json({
      success: true,
      count: trips.length,
      data: trips,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching your trips.",
      error: error.message,
    });
  }
};

export const getFullTripDetails = async (req, res) => {
  try {
    const { id } = req.params;

    // Deep Population logic to get the full relational tree

    const trip = await Trip.findById(id).populate({
      path: "stops",
      options: { sort: { arrivalDate: 1 } }, // Sort cities by travel date
      populate: {
        path: "activities",
        model: "Activity",
      },
    });

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found. It might have been deleted.",
      });
    }

    res.status(200).json({
      success: true,
      data: trip,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving itinerary details.",
      error: error.message,
    });
  }
};

export const deleteTrip = async (req, res) => {
  try {
    const { id } = req.params;

    const trip = await Trip.findById(id);
    if (!trip) {
      return res
        .status(404)
        .json({ success: false, message: "Trip not found." });
    }

    // Check ownership (Security)
    if (trip.owner.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized to delete this trip." });
    }

    // Cleanup: Remove all stops and activities linked to this trip
    await Stop.deleteMany({ tripId: id });
    await Activity.deleteMany({ tripId: id });

    // Remove trip from user's list
    await User.findByIdAndUpdate(req.user.id, { $pull: { trips: id } });

    await Trip.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Trip and all associated plans deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete trip.",
      error: error.message,
    });
  }
};

export const getTripById = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Find trip and perform "Deep Population"
    // This converts Stop IDs into objects, and Activity IDs into objects
    const trip = await Trip.findById(id).populate({
      path: "stops",
      options: { sort: { arrivalDate: 1 } }, // Keep stops in chronological order
      populate: {
        path: "activities",
        model: "Activity",
      },
    });

    // 2. Check if trip exists
    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: trip,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching trip details.",
      error: error.message,
    });
  }
};

/**
 * @desc    Get all trips marked as public (Community Feed)
 * @route   GET /api/v1/trips/public
 */
export const getPublicTrips = async (req, res) => {
  try {
    // Find trips where isPublic is true
    // We populate the owner's name and image to show who created it
    const publicTrips = await Trip.find({ isPublic: true })
      .populate("owner", "name profileImage")
      .sort({ createdAt: -1 }); // Show latest first

    res.status(200).json({
      success: true,
      count: publicTrips.length,
      data: publicTrips,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching community trips.",
      error: error.message,
    });
  }
};
