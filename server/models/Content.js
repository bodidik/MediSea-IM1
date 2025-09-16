// server/models/Content.js
import mongoose from 'mongoose';

const ContentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    section: { type: String, index: true }, // 'romatoloji', 'nefroloji' ...
    teaser: String,
    body_general: String,
    body_deep: String,
    premiumOnly: { type: Boolean, default: false },
    status: { type: String, default: 'active' }, // 'active' | 'removed'
  },
  { timestamps: true }
);

export default mongoose.models.Content || mongoose.model('Content', ContentSchema);
