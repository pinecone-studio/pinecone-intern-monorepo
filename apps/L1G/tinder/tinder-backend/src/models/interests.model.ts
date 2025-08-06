import mongoose from 'mongoose';

export type Interests = {
  _id: string;
  interestName: string;
};
const InterestsSchema = new mongoose.Schema({
  interestName: { type: String, required: true },
});

export const InterestsModel = mongoose.models.Interests || mongoose.model('Interests', InterestsSchema);
