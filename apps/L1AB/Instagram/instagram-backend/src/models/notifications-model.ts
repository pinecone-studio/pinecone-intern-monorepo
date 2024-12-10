import { model, models, Schema, Types } from 'mongoose';
import { UserType } from './user-model';
import { PostsType } from './posts-model';

export type NotificationsType = {
  _id: string;
  userId: Types.ObjectId;
  postId: Types.ObjectId;
  notifiedUserId: Types.ObjectId;
  type: string;
  createdAt: Date;
};

const NotificationsSchema = new Schema<NotificationsType>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  notifiedUserId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: 'Posts',
    required: false,
  },
  type: {
    type: String,
    required: true,
    enum: ['like', 'comment', 'follow'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export type NotificationsPopulatedType = NotificationsType & {
  userId: UserType;
  postId: PostsType;
};

export const notificationsModel = models['Notifications'] || model('Notifications', NotificationsSchema);
