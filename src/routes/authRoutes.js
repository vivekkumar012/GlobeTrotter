//Auth k liye
import express from 'express';
import { signup, login, logout, getProfile } from '../controllers/authController.js';
import auth from "../middlewares/authMiddleware.js"

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/profile", auth, getProfile); // Feature 12: User Profile

export default router;