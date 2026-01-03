import jwt from 'jsonwebtoken';
import User from '../models/userModel.js'; // Ensure the path is correct
const auth = async (req, res, next) => {
    try {
        // 1. Extract token from multiple sources
        const token = req.body?.token || 
                      req.cookies?.token || 
                      req.header("Authorization")?.replace("Bearer ", "");
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No token found! Access denied.",
            });
        }

        try {
            // 2. Verify Token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // 3. Optional but Recommended: Attach full user (minus password) to request
            // This allows controllers to use req.user._id or req.user.email easily
            req.user = await User.findById(decoded.id).select("-password");
            
            if (!req.user) {
                return res.status(404).json({ success: false, message: "User not found" });
            }

            next(); 
        } catch (error) {
            return res.status(401).json({ 
                success: false, 
                message: "Token is invalid or expired", 
                error: error.message 
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal error while validating the token",
            error: error.message,
        });
    }
};

export default auth ;