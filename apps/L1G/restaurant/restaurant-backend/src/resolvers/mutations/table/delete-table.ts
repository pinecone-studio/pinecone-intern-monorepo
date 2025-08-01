import { MutationResolvers } from 'src/generated';
import { TableModel } from 'src/models/table.model';

export const deleteTable: MutationResolvers['deleteTable'] = async (_, { tableId }) => {
  const deletedTable = await TableModel.findByIdAndDelete(tableId);

  if (!deletedTable) {
    throw new Error(`Table with ID ${tableId} not found`);
  }
  return deletedTable;
};
