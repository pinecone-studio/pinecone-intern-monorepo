

import { QueryResolvers } from '../../generated';
import { Table } from '../../models/table';

 

export const getTable: QueryResolvers['getTable'] = async (_: unknown, { id }: { id: string }) => {


    const table = await Table.findById(id);

    return table;

};
 

export const getTables: QueryResolvers['getTables'] = async () => {
  
    const tables = await Table.find();
    return tables;

};     