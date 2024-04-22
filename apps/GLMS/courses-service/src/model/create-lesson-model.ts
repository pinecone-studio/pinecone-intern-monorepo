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
  sections: [{
    type: Schema.Types.ObjectId,
    ref: 'section',
  }],
});

const lessonModel = model('lessons', lessonSchema);

export default lessonModel;
