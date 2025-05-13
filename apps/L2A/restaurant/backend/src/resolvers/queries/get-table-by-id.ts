import { tableModel } from '../../models/table.model';
import { Table } from '../../generated';

export const getTableById = async (_: unknown, { id }: { id: string }): Promise<Table> => {
  try {
    const table = await tableModel.findById(id);

    if (!table) {
      throw new Error('Table not found');
    }

    return {
      _id: table._id.toString(),
      name: table.name,
      qrCodeUrl: table.qrCodeUrl || '',
      createdAt: table.createdAt,
      updatedAt: table.updatedAt,
    };
  } catch (error) {
    throw new Error(`Error fetching table: ${(error as Error).message}`);
  }
};
