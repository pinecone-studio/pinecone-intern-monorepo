import { model, models, Schema, Types } from 'mongoose';
import { UserType } from './user-model';

export type FollowerType = {
  _id: string;
  userId: Types.ObjectId;
  followerId: Types.ObjectId;
  followeeId: Types.ObjectId;
  createdAt: Date;
};
const FollowerSchema = new Schema<FollowerType>({
  followerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  followeeId: {
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
  followeeId: UserType;
};

export const followersModel = models['Followers'] || model('Followers', FollowerSchema);
