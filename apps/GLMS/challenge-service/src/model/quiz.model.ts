import { Schema, model, models } from 'mongoose';

const ChoicesSubDocument = new Schema({
  choice: String,
  isCorrect: Boolean,
});

const QuizSchema = new Schema({
  question: String,
  choices: [ChoicesSubDocument],
});

export const QuizModel = models.quiz || model('quiz', QuizSchema);
