import { MutationResolvers } from 'src/generated';
import { TableModel } from 'src/models/table.model';
import QRCode from 'qrcode';

export const createTable: MutationResolvers['createTable'] = async (_, { input: { tableName } }) => {
  const existingTable = await TableModel.findOne({ tableName });
  if (existingTable) throw new Error('table already exists');

  const generatedQr = await QRCode.toDataURL(`http://localhost:4201/sign-in?table=${tableName}`);
  const newTable = await TableModel.create({ tableName, tableQr: generatedQr });

  return newTable;
};
