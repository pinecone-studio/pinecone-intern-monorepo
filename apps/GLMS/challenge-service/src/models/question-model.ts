import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const OptionSchema = new mongoose.Schema({
  _id: { type: String, default: () => uuidv4() },
  questionId: { type: String, ref: 'GLMS-Questions' },
  optionText: { type: String },
  isCorrect: { type: Boolean },
  createdAt: { type: Date, default: () => new Date() },
  updatedAt: { type: Date, default: () => new Date() },
});

const QuestionSchema = new mongoose.Schema({
  _id: { type: String, default: () => uuidv4() },
  quizId: { type: String, ref: 'GLMS-Quiz' },
  text: { type: String },
  options: [OptionSchema],
  createdAt: { type: Date, default: () => new Date() },
  updatedAt: { type: Date, default: () => new Date() },
});

export const QuestionModel = mongoose.models['GLMS-Question'] || mongoose.model('GLMS-Question', QuestionSchema);
