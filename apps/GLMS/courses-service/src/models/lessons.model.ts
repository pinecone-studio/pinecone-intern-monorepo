import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const LessonsSchema = new mongoose.Schema({
  _id: { type: String, default: () => uuidv4() },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GLMS-Courses',
    required: true,
  },
  title: String,
  thumbnail: String,
  content: String,
  createdAt: { type: Date, default: () => new Date() },
  updatedAt: { type: Date, default: () => new Date() },
});

export const LessonsModel = mongoose.models['GLMS-Lessons'] || mongoose.model('GLMS-Lessons', LessonsSchema);
