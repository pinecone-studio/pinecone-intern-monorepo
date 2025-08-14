import { MutationResolvers } from 'src/generated';
import { TableModel } from 'src/models/table.model';
import QRCode from 'qrcode';

export const updateTable: MutationResolvers['updateTable'] = async (_, { tableId, input: { tableName } }) => {
  const existingTable = await TableModel.findOne({ tableName });
  if (existingTable) throw new Error('table already exists');
  const generatedQr = await QRCode.toDataURL(`http://localhost:4201/sign-in?table=${tableName}`);
  const updatedTable = await TableModel.findByIdAndUpdate(tableId, { $set: { tableName, tableQr: generatedQr } }, { new: true, runValidators: true });
  if (!updatedTable) {
    throw new Error(`Table with ID ${tableId} not found`);
  }
  return updatedTable;
};
