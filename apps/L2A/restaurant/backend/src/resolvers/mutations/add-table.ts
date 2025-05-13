import { tableModel } from '../../models/table.model';
import { AddTableInput, Table } from '../../generated';
import { Types } from 'mongoose';

export const addTable = async (_: unknown, args: { input: AddTableInput }): Promise<Table> => {
  const { name } = args.input;
  const qrCodeUrl = `${new Types.ObjectId().toString()}`;
  try {
    const newTable = await tableModel.create({
      name,
      qrCodeUrl,
    });
    return newTable;
  } catch (error) {
    throw new Error(`Error creating product: ${(error as Error).message}`);
  }
};
