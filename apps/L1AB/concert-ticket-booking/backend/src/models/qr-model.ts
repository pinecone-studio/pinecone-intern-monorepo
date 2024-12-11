import { Schema, models, model } from 'mongoose';

export type QRCodeType = {
  email: string;
  link: string;
  generatedQR: string;
  createdAt?: Date;
  updatedAt?: Date;
};

const QRSchema = new Schema<QRCodeType>(
  {
    email: { type: String, required: true },
    link: { type: String, required: true },
    generatedQR: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const QRModel = models['QRCodes'] || model('QRCodes', QRSchema);
