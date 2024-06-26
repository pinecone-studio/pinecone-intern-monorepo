import mongoose from 'mongoose';

const LessonsSchema = new mongoose.Schema({
  courseId: { type: String, ref: 'GLMS-Courses' },
  title: String,
  thumbnail: String,
  content: String,
  createdAt: { type: Date, default: () => new Date() },
  updatedAt: { type: Date, default: () => new Date() },
});

export const LessonsModel = mongoose.models['GLMS-Lessons'] || mongoose.model('GLMS-Lessons', LessonsSchema);
