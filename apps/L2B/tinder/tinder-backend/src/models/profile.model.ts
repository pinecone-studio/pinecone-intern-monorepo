import { model, models, Schema } from 'mongoose';

const profileSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    interestedIn: { type: String, required: true },
    age: { type: Number, required: true },
    profileInfo: {
      name: { type: String, required: true },
      bio: { type: String, required: true },
      interest: { type: String, required: true },
      profession: { type: String, required: true },
      school: { type: String, required: true },
    },
    images: { type: [String], required: true },
  },
  { timestamps: true }
);
export const profileModel = models.Profile || model('Profile', profileSchema);
