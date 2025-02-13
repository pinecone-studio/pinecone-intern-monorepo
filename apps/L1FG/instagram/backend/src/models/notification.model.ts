import mongoose, { model, models, Schema } from 'mongoose';

const notificationSchema = new Schema(
  {
    categoryType: { type: String, enum: ['POST_LIKE', 'COMMENT_LIKE', 'REQUEST', 'FOLLOWING', 'POST_COMMENT', 'STORY_LIKE'] },
    userId: { type: mongoose.Types.ObjectId, ref: 'User' },
    ownerId: { type: mongoose.Types.ObjectId, ref: 'User' },
    contentPostId: { type: mongoose.Types.ObjectId, ref: 'Post' },
    contentCommentId: { type: mongoose.Types.ObjectId, ref: 'Comment' },
    contentStoryId: { type: mongoose.Types.ObjectId, ref: 'Story' },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const NotificationModel = models['Notification'] || model('Notification', notificationSchema);
