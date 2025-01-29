import { Schema, model, models } from 'mongoose';
/* eslint-disable no-unused-vars */
export enum HouseTypeEnum {
  House = 'House',
  Apartment = 'Apartment',
  Office = 'Office',
}
/* eslint-enable no-unused-vars */
export type PropertyFeature = {
  _id: Schema.Types.ObjectId;
  townName: string;
  price: string;
  houseType: HouseTypeEnum;
  size: string;
  images: string[];
  totalRooms: number;
  garage: boolean;
  broadExplanation: string;
  restrooms: number;
  location: {
    address: string;
    city: string;
    district: string;
    subDistrict: string;
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
  townName: { type: String },
  price: { type: String },
  houseType: {
    type: String,
    required: true,
    enum: Object.values(HouseTypeEnum),
  },

  size: { type: String, required: true },
  images: { type: [String], required: true },
  totalRooms: { type: Number, required: true },
  garage: { type: Boolean, required: true },
  broadExplanation: { type: String, required: true },
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
  uploadedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

export const PropertyFeatureModel = models['PropertyFeature'] || model<PropertyFeature>('PropertyFeature', PropertyFeatureSchema);
