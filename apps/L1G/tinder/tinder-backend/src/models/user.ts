import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  genderPreferences: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  name: { type: String, required: true },
  bio: { type: String },
  interests: { type: [String], default: [] },
  profession: { type: String, default: '' },
  schoolWork: { type: String, default: '' },
  images: { type: [String], default: [] },
  likedBy: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: [] },
  likedTo: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: [] },
  matched: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: [] },
});

export const Usermodel = mongoose.models.User || mongoose.model('User', userSchema);
