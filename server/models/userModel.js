import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  phone: {
    type: String,
  },

  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },

  dob: {
    type: Date,
  },

  address: {
    type: Object, 
    default: {},
  },

  image: {
    type: String,
    default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
  },

}, { timestamps: true });

export default mongoose.model("User", userSchema);
