import { QueryResolvers } from 'src/generated';
import { TableModel } from 'src/models/table.model';

export const getTables: QueryResolvers['getTables'] = async () => {
  const Tables = await TableModel.find();
  return Tables;
};
