import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String },
});
const UserModel = mongoose.models.User || mongoose.model('User', userSchema);
export { UserModel };
