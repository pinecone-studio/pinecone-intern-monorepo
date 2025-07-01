import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  likedBy: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: [] },
  likedTo: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: [] },
});

export const Usermodel = mongoose.model('User', userSchema);
