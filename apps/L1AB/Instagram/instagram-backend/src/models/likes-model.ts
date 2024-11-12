import { model, models, Schema, Types } from 'mongoose';
import { UserType } from './user-model';
import { PostsPopulatedType } from './posts-model';

export type LikesType = {
  _id: string;
  userId: Types.ObjectId;
  postId: Types.ObjectId;
  createdAt: Date;
};

const LikesSchema = new Schema<LikesType>({
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

export type LikesPopulatedType = LikesType & {
  userId: UserType;
  postId: PostsPopulatedType;
};

export const likesModel = models['Likes'] || model('Likes', LikesSchema);
