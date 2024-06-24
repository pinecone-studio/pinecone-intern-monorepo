import mongoose from 'mongoose';

const CoursesSchema = new mongoose.Schema({
  title: String,
  thumbnail: String,
  content: String,
  position: String,
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
  updatedAt: {
    type: Date,
    default: () => new Date(),
  },
});

export const CoursesModel = mongoose.models['GLMS-Courses'] || mongoose.model('GLMS-Courses', CoursesSchema);
