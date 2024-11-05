import { Model, Schema, Types, model, models } from 'mongoose';
import { UserType } from './user.model';
import { ProductPopulatedType } from './product.model';

export type ReviewType = {
  _id: string;
  user: Types.ObjectId;
  product: Types.ObjectId;
  comment: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
};

const reviewSchema = new Schema<ReviewType>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'product',
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export type ReviewPopulatedType = ReviewType & {
  user: UserType;
  product: ProductPopulatedType;
};

export const reviewModel: Model<ReviewType> = models['review'] || model('review', reviewSchema);
