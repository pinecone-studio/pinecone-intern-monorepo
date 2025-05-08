import { Schema, model, models } from 'mongoose';

export type TableType = {
  _id: string;
  name: string;
  qrCodeUrl?: string;
  createdAt: Date;
  updatedAt: Date;
};

const tableSchema = new Schema<TableType>({
  name: {
    type: String,
    required: true,
  },
  qrCodeUrl: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export const tableModel = models['table'] || model('table', tableSchema);
