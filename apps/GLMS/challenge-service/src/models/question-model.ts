import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const OptionSchema = new mongoose.Schema({
  _id: { type: String, default: () => uuidv4() },
  optionText: { type: String },
  isCorrect: { type: Boolean },
});

const QuestionSchema = new mongoose.Schema({
  _id: { type: String, default: () => uuidv4() },
  quizId: { type: String, ref: 'GLMS-Quizzes', required: true},
  text: { type: String },
  options: [OptionSchema],
  createdAt: { type: Date, default: () => new Date() },
  updatedAt: { type: Date, default: () => new Date() },
});

export const QuestionModel = mongoose.models['GLMS-Questions'] || mongoose.model('GLMS-Questions', QuestionSchema);
