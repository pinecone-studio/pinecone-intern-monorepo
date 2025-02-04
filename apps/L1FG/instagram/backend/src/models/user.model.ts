import mongoose, { model, models, Schema } from 'mongoose';
const userSchema = new Schema({
  userName: { type: String, unique: true, required: true },
  fullName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  bio: { type: String, default: '' },
  password: { type: String, required: true },
  isPrivate: { type: Boolean, default: false },
  hasStory: { type: Boolean, default: false },
  profileImage: {
    type: String,
    // eslint-disable-next-line no-secrets/no-secrets
    default: 'https://res.cloudinary.com/dqxstnqrf/image/upload/q_auto,f_auto/v1738557334/464760996_1254146839119862_3605321457742435801_n.png_fgbfnt.jpg',
  },
  gender: { type: String, enum: ['female', 'male', 'not_know'], default: 'not_know' },
  followingCount: {
    type: Number,
    default: 0,
    min: 0,
  },
  savedUsers: { type: [mongoose.Types.ObjectId], ref: 'User', default: [] },
  followerCount: {
    type: Number,
    default: 0,
    min: 0,
  },
  postCount: {
    type: Number,
    default: 0,
    min: 0,
  },
  postEndCursor: {
    type: String,
    default: '',
  },
});

export const UserModel = models['User'] || model('User', userSchema);
