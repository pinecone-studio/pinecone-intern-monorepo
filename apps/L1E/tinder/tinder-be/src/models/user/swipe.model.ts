import { Model, Schema, models, model } from 'mongoose';

export type SwipeType = {
  _id: Schema.Types.ObjectId;
  swiperId: string;
  swipedId: string;
  like: boolean;
  createdAt: Date;
};

const SwipeSchema = new Schema<SwipeType>(
  {
    swiperId: { type: String, required: true, ref: 'Users' },
    swipedId: { type: String, required: true, ref: 'Users' },
    like: { type: Boolean, required: true },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);
export const swipeModel: Model<SwipeType> = models['Swipe'] || model<SwipeType>('Swipe', SwipeSchema);
