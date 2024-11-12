import mongoose, { model, Schema } from "mongoose";

const roomSchema = new Schema({
    name: {
      type: String,
    },
    roomNumber: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
    },
    photos: {
      type: Array,
    },
    roomType: {
      type: String,
      enum: ["ONE", "TWO"],
    }
  },
  { timestamps: true }
);

export const roomModel = mongoose.models.room || model("room", roomSchema);
