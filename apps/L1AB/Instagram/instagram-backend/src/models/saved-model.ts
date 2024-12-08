import { model, models, Schema, Types } from 'mongoose';
import { UserType } from './user-model';
import { PostsType } from './posts-model';

export type SavedType = {
  _id: string;
  userId: Types.ObjectId;
  postId: Types.ObjectId;
  createdAt: Date;
};

const SavedSchema = new Schema<SavedType>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: 'Posts',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export type SavedPopulatedType = SavedType & {
  userId: UserType;
  postId: PostsType;
};

export const savedModel = models['Saved'] || model('Saved', SavedSchema);
