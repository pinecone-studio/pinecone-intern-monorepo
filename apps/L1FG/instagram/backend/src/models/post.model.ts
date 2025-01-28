import mongoose, { model, models, Schema } from 'mongoose';

const postSchema = new Schema(
  {
    postImage: { type: [String] },
    caption: { type: String },
    userId: { type: mongoose.Types.ObjectId, ref: 'User' },
    carouselMediaCount: { type: Number },
    commentCount:{
      type:Number,
      required:true,
      default:0,
      min:0
    },
    likeCount:{
      type:Number,
      required:true,
      default:0,
      min:0
    }
  },
  { timestamps: true }
);

export const PostModel = models['Post'] || model('Post', postSchema);
