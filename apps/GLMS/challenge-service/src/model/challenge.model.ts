import { Schema, model, models } from 'mongoose';

const ChallengeSchema = new Schema({
  title: {
    type: String,
  },
  author: {
    type: String,
    required: true,
  },
  refCourse: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['APPROVED', 'DRAFT'],
    required: true,
  },
  quiz: [
    {
      type: Schema.ObjectId,
      ref: 'quiz',
      required: true,
    },
  ],
});

export const ChallengeModel = models.challenge || model('challenge', ChallengeSchema);
