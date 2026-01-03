import mongoose from "mongoose";

const tripSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isPublic: { type: Boolean, default: false },
    totalBudget: { type: Number, default: 0 },
    // Reference to the separate Stop model
    stops: [{ type: mongoose.Schema.Types.ObjectId, ref: "Stop" }],
    coverImage: String,
  },
  { timestamps: true }
);

export default mongoose.model("Trip", tripSchema);
