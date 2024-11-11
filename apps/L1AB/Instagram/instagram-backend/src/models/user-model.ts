import { model, models, Schema } from "mongoose";

export const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    default: "No email added",
  },
  password: {
    type: String,
    required: true,
    default: "No password added",
  },
  username: {
    type: String,
    required: true,
    default: "No username",
  },
  profilePicture: {
    type: String,
    required: true,
    default: "No profile picture added",
  },
  bio: {
    type: String,
    required: true,
  },
  isPrivate: {
    type: Boolean,
    required: true,
    default: false,
  },
}, {
  timestamps: true, 
});

export const UserModel = models.User || model("User", UserSchema);
