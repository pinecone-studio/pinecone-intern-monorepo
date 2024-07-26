import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const QuizSchema = new mongoose.Schema({
  _id: { type: String, default: () => uuidv4() },
  courseId: { type: String, ref: 'GLMS-Courses' },
  createdAt: { type: Date, default: () => new Date() },
  updatedAt: { type: Date, default: () => new Date() },
});

export const QuizModel = mongoose.models['GLMS-Quizzes'] || mongoose.model('GLMS-Quizzes', QuizSchema);
