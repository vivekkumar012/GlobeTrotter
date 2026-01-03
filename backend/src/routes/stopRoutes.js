import express from 'express';
import { addStop, deleteStop } from '../controllers/stopControllers.js';
import { addActivity, deleteActivity } from '../controllers/activityController.js';
import auth from "../middlewares/authMiddleware.js"
const router = express.Router();

router.use(auth);

// Stop Management (Feature 5)
router.post("/", addStop);                // Add a city stop to a trip
router.delete("/:id", deleteStop);        // Remove a city stop

// Activity Management (Feature 8)
router.post("/activity", addActivity);    // Add activity to a specific stop
router.delete("/activity/:id", deleteActivity); // Remove activity

export default router;