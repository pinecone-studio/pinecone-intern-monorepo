import { Schema, model } from 'mongoose';

const courseSchema = new Schema({
  title: {
    type: String,
  },
  content: [
    {
      title: {
        type: String,
      },
      description: {
        type: String,
      },
    },
  ],
  thumbnail: {
    type: String,
  },
  position: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}); 

const courseModel = model('Course', courseSchema);

export default courseModel;
