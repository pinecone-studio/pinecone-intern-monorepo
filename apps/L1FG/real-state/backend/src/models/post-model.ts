import mongoose, { Schema, Document, Types, models } from 'mongoose';
import { HouseTypeEnum } from './property-feature.model';
export interface PostType extends Document {
  _id: string;
  propertyOwnerId: Types.ObjectId;
  title: string;
  description: string;
  price: string;
  propertyDetail: Types.ObjectId;
  status: 'PENDING' | 'APPROVED' | 'DECLINED';
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema: Schema = new Schema<PostType>(
  {
    propertyOwnerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
      min: 0,
    },
    propertyDetail: {
      houseType: {
        type: String,
        required: true,
        enum: Object.values(HouseTypeEnum),
        ref: 'PropertyFeature',
      },

      size: { type: String, required: true },
      images: { type: [String], required: true },
      totalRooms: { type: Number, required: true },
      garage: { type: Boolean, required: true },
      restrooms: { type: Number, required: true },
      location: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        district: { type: String, required: true },
        subDistrict: { type: String, required: true },
      },
      details: {
        completionDate: Date,
        windowsCount: { type: Number, required: true },
        windowType: { type: String, required: true },
        floorMaterial: { type: String, required: true },
        floorNumber: { type: Number, required: true },
        balcony: { type: Boolean, required: true },
        totalFloors: { type: Number, required: true },
        lift: { type: Boolean, required: true },
      },
    },
    status: {
      type: String,
      enum: ['PENDING', 'APPROVED', 'DECLINED'],
      required: true,
      default: 'PENDING',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const Post = models['Post'] || mongoose.model<PostType>('Post', PostSchema);
