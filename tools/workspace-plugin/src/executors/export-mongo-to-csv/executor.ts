/* eslint-disable complexity */
import { createObjectCsvWriter } from 'csv-writer';
import dotenv from 'dotenv';
import fs from 'fs';
import { MongoClient } from 'mongodb';
import path from 'path';

type ExportToCsvOptions = {
  databaseName: string;
  collectionName: string;
  outputPath: string;
  filePath: string;
};

const connectToDatabase = async (mongoUri: string, dbName: string) => {
  const client = new MongoClient(mongoUri);
  await client.connect();
  const database = client.db(dbName);
  return { client, database };
};

const fetchDataFromCollection = async (database, collectionName: string) => {
  const collection = database.collection(collectionName);
  return collection.find({}).toArray();
};

const prepareCsvHeaders = (data) => {
  return data[0] ? Object.keys(data[0]).map((key) => ({ id: key, title: key })) : [];
};

const ensureDirectoryExists = (outputPath: string) => {
  const directory = path.dirname(outputPath);
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
};

const writeDataToCsv = async (data, headers, outputPath: string) => {
  const csvWriter = createObjectCsvWriter({ path: outputPath, header: headers });
  await csvWriter.writeRecords(data);
};

const checkIfDataIsEmpty = async (data) => {
  if (data.length === 0) {
    console.warn('No data available, or the collection or database name might be incorrect');
  }
};

const runExecutor = async (options: ExportToCsvOptions): Promise<{ success: boolean }> => {
  const { databaseName, collectionName, outputPath, filePath } = options;
  const fullPath = path.resolve(filePath);
  try {
    const fileContent = await fs.promises.readFile(fullPath, 'utf8');
    const parsedVars = dotenv.parse(fileContent);
    const { MONGO_URI } = parsedVars;

    const { client, database } = await connectToDatabase(MONGO_URI, databaseName);
    const data = await fetchDataFromCollection(database, collectionName);
    await checkIfDataIsEmpty(data);
    const headers = prepareCsvHeaders(data);
    ensureDirectoryExists(outputPath);
    await writeDataToCsv(data, headers, outputPath);

    await client.close();
    return { success: true };
  } catch (error) {
    console.error("An error occurred in 'runExecutor' during 'exportToCsv' operation.", error);
    return { success: false };
  }
};

export default runExecutor;
