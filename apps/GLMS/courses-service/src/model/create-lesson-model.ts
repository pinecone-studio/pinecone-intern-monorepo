import { Schema, model } from 'mongoose';

const lessonSchema = new Schema({
  title: {
    type: String,
  },
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

const lessonModel = model('lesson', lessonSchema);

export default lessonModel;