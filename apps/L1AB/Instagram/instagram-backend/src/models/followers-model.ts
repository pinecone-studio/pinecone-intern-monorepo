import { model, models, Schema, Types } from 'mongoose';
import { UserType } from './user-model';

export type FollowerType = {
  _id: string;
  userId: Types.ObjectId;
  followerId: Types.ObjectId;
  followingId: Types.ObjectId;
  createdAt: Date;
};
const FollowerSchema = new Schema<FollowerType>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  followerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  followingId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export type FollowersPopulatedType = FollowerType & {
  userId: UserType;
  followerId: UserType;
  followingId: UserType;
};

export const followersModel = models['Followers'] || model('Followers', FollowerSchema);
