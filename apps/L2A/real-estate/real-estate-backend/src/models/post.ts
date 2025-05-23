import mongoose from "mongoose";

const POST_SCHEMA = new mongoose.Schema(
  {
    propertyOwnerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    feature: [
      {
        type: String,
        enum: ["CENTRAL", "AIRY","PREMIUM_ZONE"],
      },
    ],
    description: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    images: [String],
    type: {
      type: String,
      enum: ["APARTMENT", "HOUSE", "OFFICE"],
    },
    size: Number,
    totalRooms: Number,
    garage: Boolean,
    restrooms: Number,
    location: {
      address: String,
      city: String,
      district: String,
    },
    completionDate: Date,
    windowsCount: Number,
    windowType: String,
    roofMaterial: String,
    floorNumber: Number,
    balcony: Boolean,
    totalFloors: Number,
    lift: Boolean,
    status: {
      type: String,
      enum: ["PENDING", "SALE", "APPROVED","DECLINED", "SOLD", "SAVED"],
      default: "PENDING",
      required: true,
    },
  },
  {
    timestamps: true, 
  }
);

export const POST_MODEL = mongoose.models.Post || mongoose.model("Post", POST_SCHEMA);

