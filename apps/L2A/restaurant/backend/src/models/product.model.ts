import { Schema, Types, model, models } from 'mongoose';
import { Product } from '../generated';

export type ProductType = {
  _id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  category: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

const productSchema = new Schema<Product>({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'category',
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    required: true,
    default: () => Date.now(),
  },
});

export const productModel = models['product'] || model('product', productSchema);
