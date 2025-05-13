import { tableModel } from '../../models/table.model';

export const getAllTables = async () => {
  try {
    const tables = await tableModel.find();
    if (!tables) {
      throw new Error(' Tables not found');
    }
    return tables
  } 
    catch (error) {
    throw new Error(`Error fetching table: ${(error as Error).message}`);
  };
  }

