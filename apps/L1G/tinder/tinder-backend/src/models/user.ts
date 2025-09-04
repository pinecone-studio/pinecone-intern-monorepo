import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  genderPreferences: { type: String, default: '' },
  gender: { type: String, default: '' },
  dateOfBirth: { type: String, default: '' },
  name: { type: String, default: '' },
  bio: { type: String },
  interests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Interests' }],
  profession: { type: String, default: '' },
  schoolWork: { type: String, default: '' },
  images: { type: [String], default: [] },
  likedBy: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: [] },
  likedTo: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: [] },
  matchIds: { type: [mongoose.Schema.Types.ObjectId], ref: 'Match', default: [] },
  dislikedTo: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: [] },
});

export const Usermodel = mongoose.models.User || mongoose.model('User', userSchema);
