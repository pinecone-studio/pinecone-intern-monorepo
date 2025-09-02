import { QueryResolvers } from 'src/generated';
import { TableModel } from 'src/models/table.model';

export const getTableByName: QueryResolvers['getTableByName'] = async (_, { tableName }) => {
  const table = await TableModel.findOne({ tableName });

  if (!table) {
    throw new Error(`Table with name ${tableName} not found`);
  }

  return table;
};
