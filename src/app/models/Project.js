import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema(
  {
    title: String,
    description: String,
    longDescription: String,
    image: [
      {
        url: String,
      },
    ],
    technologies: [String],
    github: String,
    live: String,
    category: String,
  },
  { timestamps: true }
);

export const Projects =
  mongoose.models.Projects || mongoose.model("Projects", projectSchema);
