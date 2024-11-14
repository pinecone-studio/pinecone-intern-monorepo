import { model, models, Schema, Types } from 'mongoose';
import { UserType } from './user-model';

export type StoryType = {
  _id: string;
  userId: Types.ObjectId;
  views: Types.ObjectId[];
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
  views: {
    type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    default: [],
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

StorySchema.index({ views: 1 });

export type StoryPopulatedType = StoryType & {
  userId: UserType;
  views: UserType[];
};

export const storyModel = models['Story'] || model('Story', StorySchema);
