import { Schema, model, models, Types } from 'mongoose';

export type Table = {
  _id: Types.ObjectId;
  tableName: string;
  tableQr: string;
};

const TableSchema = new Schema<Table>(
  {
    tableName: {
      type: String,
      required: true,
      unique: true,
    },
    tableQr: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const TableModel = models.Table || model<Table>('Table', TableSchema);
