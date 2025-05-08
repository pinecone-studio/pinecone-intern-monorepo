import { DeleteTableInput } from '../../generated';
import { tableModel } from '../../models/table.model';

export const deleteTable = async (_: unknown, { input }: { input: DeleteTableInput }) => {
  try {
    const deletedTable = await tableModel.findByIdAndDelete(input._id);
    if (!deletedTable) {
      throw new Error('Table not found.');
    }
    return deletedTable;
  } catch (error) {
    throw new Error(`Error deleting table: ${(error as Error).message}`);
  }
};
