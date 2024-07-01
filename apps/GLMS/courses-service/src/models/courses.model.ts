import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const CoursesSchema = new mongoose.Schema({
  _id: { type: String, default: () => uuidv4() },
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
