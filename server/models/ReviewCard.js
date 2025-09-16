// FILE: server/models/ReviewCard.js
import mongoose from "mongoose";

const reviewCardSchema = new mongoose.Schema(
  {
    userId: { type: String, index: true, required: true },
    contentId: String,
    section: String,
    type: { type: String, enum: ["topic","board","case","video","note"], default: "topic" },
    ease: { type: Number, default: 2.5, min: 1.3, max: 3.0 },
    interval: { type: Number, default: 0, min: 0 },
    dueAt: { type: Date, index: true },
  },
  { timestamps: true }
);

reviewCardSchema.index({ userId: 1, dueAt: 1 });

export default mongoose.models.ReviewCard || mongoose.model("ReviewCard", reviewCardSchema);
