import { model, models, Schema, Types } from 'mongoose';
import { UserType } from './user-model';

export type PostsType = {
  _id: string;
  userId: Types.ObjectId;
  images: string[];
  caption: string;
  likeCounts: number;
  likedUsers: [Schema.Types.ObjectId];
  createdAt: Date;
  updatedAt: Date;
};

const PostsSchema = new Schema<PostsType>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  caption: {
    type: String,
    required: true,
  },
  likeCounts: {
    type: Number,
    default: 0,
    required: true,
    min: [0, 'Like count cannot be less than 0'],
  },
  likedUsers: {
    type: [Schema.Types.ObjectId],
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export type PostsPopulatedType = PostsType & {
  userId: UserType;
};

export const postsModel = models['Posts'] || model('Posts', PostsSchema);
