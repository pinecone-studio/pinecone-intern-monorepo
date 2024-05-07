import { Lesson } from '@/graphql/generated';
import { Model, Schema, model, models } from 'mongoose';

const lessonSchema = new Schema({
  courseId: {
    type: Schema.Types.ObjectId,
  },
  title: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  position: {
    type: Number,
  },
<<<<<<< HEAD

=======
  courseId: {
    type: String,
  },
>>>>>>> be6f3c89 (feat(lesson-query): lesson query)
  createdAt: {
    type: Date,
    default: Date.now,
  },
  sections: [
    {
      type: Schema.Types.ObjectId,
      ref: 'section',
    },
  ],
});

const lessonModel: Model<Lesson> = models.lesson || model<Lesson>('lesson', lessonSchema);

export default lessonModel;
