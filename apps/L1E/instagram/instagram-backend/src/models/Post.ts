import mongoose, { Document, Schema } from 'mongoose';

export interface IPost extends Document {
  author: mongoose.Types.ObjectId;
  caption?: string;
  image: string;
  likes: mongoose.Types.ObjectId[];
  comments: mongoose.Types.ObjectId[];
  isPublic: boolean;
  createdAt: Date;
}

const PostSchema = new Schema<IPost>({
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  caption: { type: String },
  image: { type: String, required: true },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  isPublic: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

export const Post = mongoose.model<IPost>('Post', PostSchema);