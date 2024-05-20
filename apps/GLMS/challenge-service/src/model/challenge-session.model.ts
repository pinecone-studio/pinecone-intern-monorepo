import { Schema, model, models } from 'mongoose';

const challengeSessionSchema = new Schema({
  studentEmail: { type: String },
  challengeId: { type: Schema.Types.ObjectId },
  experiencePoint: { type: Number },
  startedAt: { type: Date },
  endAt: { type: Date },
});

export const ChallengeSessionModel = models.ChallengeSession || model('ChallengeSession', challengeSessionSchema);
