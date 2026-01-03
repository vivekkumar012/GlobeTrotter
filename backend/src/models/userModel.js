import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    // 1. Basic Authentication
    name: { 
        type: String, 
        required: [true, "Please provide your name"], 
        trim: true 
    },
    email: { 
        type: String, 
        required: [true, "Please provide an email"], 
        unique: true, 
        lowercase: true 
    },
    password: { 
        type: String, 
        required: [true, "Please provide a password"],
        select: false // Prevents password from being returned in API calls by default
    },

    // 2. Profile Customization (Feature 12)
    profileImage: { 
        type: String, 
        default: "https://api.dicebear.com/5.x/initials/svg?seed=User" 
    },
    bio: { 
        type: String, 
        maxLength: [200, "Bio cannot exceed 200 characters"] 
    },
    preferences: {
        currency: { type: String, default: "USD" },
        language: { type: String, default: "English" }
    },

    // 3. Relational Data (Feature 4)
    // Reference to all trips created by this user
    trips: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Trip' 
    }],

    // 4. Social Feature (Feature 12 - Saved Destinations)
    savedDestinations: [{
        cityName: String,
        country: String
    }],

    // 5. Account Security (Feature 1)
    resetPasswordToken: String,
    resetPasswordExpires: Date,

}, { 
    timestamps: true // Automatically creates 'createdAt' and 'updatedAt'
});

export default mongoose.model('User', userSchema);