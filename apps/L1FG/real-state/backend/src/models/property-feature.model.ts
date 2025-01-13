import { Schema, model } from 'mongoose';

export type PropertyFeature = {
  _id: Schema.Types.ObjectId;
  houseType: 'House' | 'Apartment' | 'Office';
  size: number;
  images: string[];
  totalRooms: number;
  garage: boolean;
  restrooms: number;
  location: {
    address: string;
    city: number;
    district: string;
  };
  details: {
    completionDate: Date;
    windowsCount: number;
    windowType: string;
    floorMaterial: string;
    floorNumber: number;
    balcony: boolean;
    totalFloors: number;
    lift: boolean;
  };
  uploadedAt: Date;
  createdAt: Date;
};

const PropertyFeatureSchema = new Schema<PropertyFeature>({
  houseType: {
    type: String,
    required: true,
    enum: ['House', 'Apartment', 'Office'],
  },
  size: { type: Number, required: true },
  images: { type: [String], required: true },
  totalRooms: { type: Number, required: true },
  garage: { type: Boolean, required: true },
  restrooms: { type: Number, required: true },
  location: {
    address: { type: String, required: true },
    city: { type: Number, required: true },
    district: { type: String, required: true },
  },
  details: {
    completionDate: { type: Date, required: true },
    windowsCount: { type: Number, required: true },
    windowType: { type: String, required: true },
    floorMaterial: { type: String, required: true },
    floorNumber: { type: Number, required: true },
    balcony: { type: Boolean, required: true },
    totalFloors: { type: Number, required: true },
    lift: { type: Boolean, required: true },
  },
  uploadedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

export const PropertyFeatureModel = model<PropertyFeature>('PropertyFeature', PropertyFeatureSchema);
