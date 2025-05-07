import { UpdateTableInput } from '../../generated';
import { tableModel } from '../../models/table.model';
import { Table } from '../../generated';

export const updateTable = async (_: unknown, { input }: { input: UpdateTableInput }): Promise<Table> => {
  try {
    const updatedTable = await tableModel.findByIdAndUpdate(input._id, { name: input.name }, { new: true });

    if (!updatedTable) {
      throw new Error('Table not found.');
    }

    return {
      _id: updatedTable._id.toString(),
      name: updatedTable.name,
      qrCodeUrl: updatedTable.qrCodeUrl,
      createdAt: updatedTable.createdAt,
      updatedAt: updatedTable.updatedAt,
    };
  } catch (error) {
    throw new Error(`Error updating table: ${(error as Error).message}`);
  }
};
