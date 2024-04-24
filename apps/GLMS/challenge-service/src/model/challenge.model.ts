import { Schema, model, models } from 'mongoose';

const ChallengeSchema = new Schema({
  title: String,
  author: String,
  refCourse: String,
  status: String,
  quiz: [
    {
      type: Schema.ObjectId,
      ref: 'quiz',
    },
  ],
});

export const ChallengeModel = models.challenge || model('challenge', ChallengeSchema);
