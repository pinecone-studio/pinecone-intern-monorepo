import mongoose, { model, models, Schema } from 'mongoose';

const postLikeSchema = new Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: 'User' },
    postId: { type: mongoose.Types.ObjectId, ref: 'Post' },
  },
  {
    timestamps: true,
  }
);

export const PostLikeModal = models['PostLike'] || model('PostLike', postLikeSchema);
