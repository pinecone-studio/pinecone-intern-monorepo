import { tableModel } from '../../models/table.model';
import { AddTableInput, Table } from '../../generated';
import { Types } from 'mongoose';

export const addTable = async (parent: unknown, args: { input: AddTableInput }): Promise<Table> => {
  const { name } = args.input;
  const qrCodeUrl = `https://example.com/qrcode/${new Types.ObjectId().toString()}`;
  const newTable = new tableModel({
    name,
    qrCodeUrl,
  });
  try {
    const savedTable = await newTable.save();
    return {
      _id: savedTable._id.toString(),
      name: savedTable.name,
      qrCodeUrl: savedTable.qrCodeUrl,
      createdAt: savedTable.createdAt,
      updatedAt: savedTable.updatedAt,
    };
  } catch (error) {
    throw new Error(`Error creating product: ${(error as Error).message}`);
  }
};
