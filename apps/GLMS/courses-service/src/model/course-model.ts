import { Course } from '@/graphql/generated';
import { Model, Schema, model, models } from 'mongoose';

const courseSchema = new Schema({
  title: {
    type: String,
  },
  description: { type: String },
  thumbnail: { type: String },
  position: { type: Number},
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const courseModel: Model<Course> = models.course || model<Course>('course', courseSchema);
export default courseModel;
