import express from 'express';
import { getBreakdown, getStopCosts, checkLimit } from '../controllers/budgetController.js';
import auth from "../middlewares/authMiddleware.js"

const router = express.Router();

router.get('/breakdown/:tripId', auth, getBreakdown);
router.get('/stops/:tripId', auth, getStopCosts);
router.get('/limit/:tripId', auth, checkLimit);

export default router;