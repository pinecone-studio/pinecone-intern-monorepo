import { Schema, model, models } from 'mongoose';

const courseSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  position: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const courseModel = models.Course || model('Course', courseSchema);

export default courseModel;
