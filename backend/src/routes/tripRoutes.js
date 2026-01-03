//For trip

import express from "express";
import {
  createTrip,
  getMyTrips,
  getTripById,
  deleteTrip,
  getPublicTrips,
} from "../controllers/tripController.js";
import auth from "../middlewares/authMiddleware.js"
const router = express.Router();

router.post("/", auth, createTrip); // Feature 3: Create Trip
router.get("/my-trips", auth, getMyTrips); // Feature 4: Trip List
router.get("/public", auth, getPublicTrips); // Feature 11: Community Feed
router.get("/:id", auth, getTripById); // Feature 6: Full Itinerary View
router.delete("/:id", auth, deleteTrip); // Manage existing trips

export default router;
