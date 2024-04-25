import { Schema, model, models } from 'mongoose';

const ChoicesSubDocument = new Schema({
  choice: {
    type: String,
    required: true,
  },
  isCorrect: {
    type: Boolean,
    required: true,
  },
});

const QuizSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  choices: [ChoicesSubDocument],
  choicesType: {
    type: String,
    required: true,
    enum: ['IMAGE', 'TEXT'],
  },
});

export const QuizModel = models.quiz || model('quiz', QuizSchema);
