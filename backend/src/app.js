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
app.use(cookieParser());


app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/trips', tripRoutes);
app.use('/api/v1/stops', stopRoutes);
app.use('/api/v1/budget', budgetRoutes);

export default app;