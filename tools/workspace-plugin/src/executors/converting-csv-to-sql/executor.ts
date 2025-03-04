import { parse } from 'csv-parse';
import fs, { promises as fsPromises } from 'fs';
import path from 'path';

export type CsvRow = {
  resource: string;
  owner: string;
  code: number | string;
  severity: number;
  message: string;
  source: string;
  startLineNumber: number;
  startColumn: number;
  endLineNumber: number;
  endColumn: number;
};

export type ConvertCsvToSqlOptions = {
  inputCsvPath: string;
  outputSqlPath: string;
  tableName: string;
};

export const ensureDirectoryExists = async (outputPath: string) => {
  const directory = path.dirname(outputPath);
  if (!fs.existsSync(directory)) {
    await fsPromises.mkdir(directory, { recursive: true });
  }
};

const parseCsv = (content): Promise<CsvRow[]> => {
  return new Promise((resolve) => {
    parse(
      content,
      {
        columns: true,
        skipEmptyLines: true,
      },
      (_, records) => {
        resolve(records);
      }
    );
  });
};

export const readCsvFile = async (inputCsvPath: string): Promise<CsvRow[]> => {
  try {
    const fileContent = fs.readFileSync(inputCsvPath, { encoding: 'utf-8' });
    const records = await parseCsv(fileContent);
    return records;
  } catch (error) {
    console.log('Error during file reading or CSV parsing:', error);
    throw error;
  }
};

const generateSqlInsertStatements = (data: CsvRow[], tableName: string): string[] => {
  return data.map((row) => {
    const columns = Object.keys(row)
      .map((col) => `"${col}"`)
      .join(', ');
    const values = Object.values(row)
      .map((value) => `'${value}'`)
      .join(', ');
    return `INSERT INTO ${tableName} (${columns}) VALUES (${values});`;
  });
};

const writeSqlToFile = async (sqlStatements: string[], outputPath: string) => {
  const sqlContent = sqlStatements.join('\n');
  await fsPromises.writeFile(outputPath, sqlContent);
};

const runExecutor = async (options: ConvertCsvToSqlOptions): Promise<{ success: boolean }> => {
  const { inputCsvPath, outputSqlPath, tableName } = options;
  const fullPath = path.resolve(inputCsvPath);

  try {
    await ensureDirectoryExists(outputSqlPath);

    const data = await readCsvFile(fullPath);

    const sqlStatements = generateSqlInsertStatements(data, tableName);

    await writeSqlToFile(sqlStatements, outputSqlPath);

    return { success: true };
  } catch (error) {
    return { success: false };
  }
};

export default runExecutor;
