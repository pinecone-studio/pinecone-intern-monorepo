import { Schema, model, models } from 'mongoose';

const courseSchema = new Schema({
  title: {
    type: String,
  },
  description: { type: String },
  thumbnail: { type: String },
  status: { type: String },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const courseModel = models.course || model('course', courseSchema);
