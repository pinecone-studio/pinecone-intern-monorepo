import { model, models, Schema, Types } from 'mongoose';
import { UserType } from './user-model';
import { PostsType } from './posts-model';

export type CommentsType = {
  _id: string;
  userId: Types.ObjectId;
  postId: Types.ObjectId;
  comment: string;
  updatedAt: Date;
  createdAt: Date;
};
const CommentsSchema = new Schema<CommentsType>({
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
  comment: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export type CommentsPopulatedType = CommentsType & {
  userId: UserType;
  postId: PostsType;
};

export const commentsModel = models['Comments'] || model('Comments', CommentsSchema);
