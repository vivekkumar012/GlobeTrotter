import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Import Routes
import authRoutes from './routes/authRoutes.js';
import tripRoutes from './routes/tripRoutes.js';
import stopRoutes from './routes/stopRoutes.js';
import budgetRoutes from "./routes/budgetRoutes.js"

const app = express();

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173", 
    credentials: true, 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// 2. Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

// 3. Cookie Parser
app.use(cookieParser());

// --- 2. Mount API Routes ---

// All Auth routes (Login, Signup)
app.use('/api/v1/auth', authRoutes);

// All Trip routes (Create Trip, My Trips, Public Trips)
app.use('/api/v1/trips', tripRoutes);

// All Stop & Activity routes (Itinerary Builder)
app.use('/api/v1/stops', stopRoutes);

// All Budget routes (Breakdown, Stop Costs, Limits)
app.use('/api/v1/budget', budgetRoutes);


// Export the app instance
export default app;