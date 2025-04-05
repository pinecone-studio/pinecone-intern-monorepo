
import { MutationResolvers } from "../../generated";
import { Table } from "../../models/table";

export const addTable: MutationResolvers['addTable']  = async (_,  {name, qrCodeUrl}) => {

    
    // const newTable = new Table({ name, qrCodeUrl });
    const newTable = await Table.create({ name, qrCodeUrl });
    return newTable;

};
 
export const updateTable: MutationResolvers['updateTable'] = async (_, { id, name, qrCodeUrl }: { id: string; name?: string; qrCodeUrl?: string }) => {


    const updatedTable = await Table.findByIdAndUpdate(id, { name, qrCodeUrl }, { new: true });
    return updatedTable; 

};
 
export const deleteTable: MutationResolvers['deleteTable'] = async (_, { id }: { id: string }) => {

    const deletedTable = await Table.findByIdAndDelete(id);
    if (!deletedTable) throw new Error('Table not found.');
    return deletedTable ; 

};