import { Schema, model } from 'mongoose';
const courseSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
});
const courseModel = model('course', courseSchema);
export default courseModel;
