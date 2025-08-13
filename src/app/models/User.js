import mongoose from "mongoose";

const SocialLinksSchema = new mongoose.Schema(
  {
    github: { type: String },
    linkedin: { type: String },
    facebook: { type: String },
    twitter: { type: String },
  },
  { _id: false }
);

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    trim: true,
  },
  bio: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  mainImage: {
    type: String,
    default: "/images/profile.jpg",
  },
  aboutImage: {
    type: String,
    default: "/images/about.jpg",
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,

    default: "user",
  },
  socialLinks: SocialLinksSchema,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
