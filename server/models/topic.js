import mongoose from "mongoose";

const subtopicSchema = new mongoose.Schema(
  {
    title:   { type: String, required: true },
    slug:    { type: String, required: true },
    content: { type: String, default: "" },
  },
  { _id: false }
);

const topicSchema = new mongoose.Schema(
  {
    title:         { type: String, required: true },
    slug:          { type: String, unique: true, required: true },
    section:       { type: String, required: true }, // nefroloji, gastro, ...
    content:       { type: String, default: "" },
    subtopics:     { type: [subtopicSchema], default: [] },
    relatedTopics: { type: [String], default: [] }, // slug listesi
    relatedCases:  { type: [String], default: [] }, // case slug listesi
    references:    { type: [String], default: [] },
    tags:          { type: [String], default: [] },
    lang:          { type: String, enum: ["TR","EN"], default: "TR" },
    summary:       { type: String, default: "" },
  },
  { timestamps: true }
);

// Metin araması için temel index
topicSchema.index({
  title: "text",
  content: "text",
  "subtopics.title": "text",
  summary: "text",
  tags: "text",
});

export default mongoose.model("Topic", topicSchema);
