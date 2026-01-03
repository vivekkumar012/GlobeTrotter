import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Helper: Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

// --- SIGNUP / REGISTER ---
export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // 1. Basic Validation
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // 2. Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already registered" });
        }

        // 3. Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 4. Create User
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            profileImage: `https://api.dicebear.com/5.x/initials/svg?seed=${name}`
        });

        // 5. Generate Token
        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            message: "User created successfully",
            token,
            user: { id: user._id, name: user.name, email: user.email }
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// --- LOGIN ---
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Check for email/password
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Provide email and password" });
        }

        // 2. Find user & explicitly select password (because it's select: false in model)
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        // 3. Compare Password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        // 4. Generate Token
        const token = generateToken(user._id);

        // 5. Send cookie & response
        res.status(200).cookie('token', token, {
            httpOnly: true,
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000) // 1 day
        }).json({
            success: true,
            token,
            user: { id: user._id, name: user.name, email: user.email },
            message: "Welcome back!"
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// --- GET USER PROFILE (Feature 12) ---
export const getProfile = async (req, res) => {
    try {
        // req.user is populated by your auth middleware
        const user = await User.findById(req.user.id).populate('trips');
        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// --- LOGOUT ---
export const logout = (req, res) => {
    res.cookie('token', null, { expires: new Date(0), httpOnly: true });
    res.status(200).json({ success: true, message: "Logged out" });
};