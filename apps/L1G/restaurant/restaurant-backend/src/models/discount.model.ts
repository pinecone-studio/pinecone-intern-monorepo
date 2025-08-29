import { model, models, Schema, Types } from 'mongoose';

export type DiscountType = {
  _id: Types.ObjectId;
  discountName: string;
  discountRate: number;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
};

export const DiscountSchema = new Schema<DiscountType>(
  {
    discountName: {
      type: String,
      required: true,
    },
    discountRate: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const DiscountModel = models.Discount || model<DiscountType>('Discount', DiscountSchema);
