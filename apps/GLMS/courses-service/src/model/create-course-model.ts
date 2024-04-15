import { Schema, model } from 'mongoose';

const lessonSchema = new Schema({
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

const lessonModel = model('Lesson', lessonSchema);

export default lessonModel;
