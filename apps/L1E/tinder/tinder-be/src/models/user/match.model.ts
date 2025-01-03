import { Model, Schema, models, model } from 'mongoose';

export type MatchType = {
  _id: Schema.Types.ObjectId;
  userId: string;
  targetUserId: string;
  stillmatch: boolean;
  createdAt: Date;
};

const MatchSchema = new Schema<MatchType>(
  {
    userId: { type: String, required: true, ref: 'User' },
    targetUserId: { type: String, required: true, ref: 'User' },
    stillmatch: { type: Boolean, required: true },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

MatchSchema.index({ userId: 1, targetUserId: 1 }, { unique: true });

export const matchModel: Model<MatchType> = models['Match'] || model<MatchType>('Match', MatchSchema);
