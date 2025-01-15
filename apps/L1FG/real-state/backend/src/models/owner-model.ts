import mongoose, { Schema, Document, Types, models } from "mongoose";

export interface OwnerType extends Document {
  _id: string;
  propertyOwnerId: Types.ObjectId
  title: string;
  description: string;
  price: number;
  propertyDetail: Types.ObjectId 
  status: 'PENDING' | 'APPROVED' | 'DECLINED';
  createdAt: Date;
  updatedAt: Date;
}

const OwnerSchema: Schema = new Schema<OwnerType>({
  propertyOwnerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User" 
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
    type: Number,
    required: true,
    min: 0
  },
  propertyDetail: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PropertyDetail", 
  },
  status: {
    type: String,
    enum: ["PENDING", "APPROVED", "DECLINED"],
    required: true,
    default: "PENDING"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export const Owner =models["Owner"] || mongoose.model<OwnerType>("Owner", OwnerSchema);
