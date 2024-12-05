import { model, models, Schema, Types } from 'mongoose';
import { UserType } from './user-model';

export type StoryType = {
  _id: string;
  userId: Types.ObjectId;
  image: string;
  createdAt: Date;
};

const StorySchema = new Schema<StoryType>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export type StoryPopulatedType = StoryType & {
  userId: UserType;
};

export const storyModel = models['Story'] || model('Story', StorySchema);
