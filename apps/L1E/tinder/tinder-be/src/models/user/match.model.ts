import mongoose, { Model, Schema, models, model } from 'mongoose';

export type MatchType = {
  _id: Schema.Types.ObjectId;
  userId: string;
  targetUserId: string;
  stillmatch: boolean;
  createdAt: Date;
};

const matchSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  targetUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  stillmatch: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

matchSchema.index({ userId: 1, targetUserId: 1 }, { unique: true });

export const matchModel: Model<MatchType> = models['Match'] || model<MatchType>('Match', matchSchema);
