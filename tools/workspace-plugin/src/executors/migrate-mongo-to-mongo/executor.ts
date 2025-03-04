/* eslint-disable complexity */
import { Collection, Document, FindCursor, MongoClient, ServerApiVersion, WithId } from 'mongodb';
import { MongotoMongoMigrateExecutorSchema } from './schema';
const createMongoClient = (uri: string) =>
  new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

export const insertRecords = async (document: WithId<Document>, targetCollection: Collection<Document>) => {
  try {
    await targetCollection.insertOne(document, { ignoreUndefined: true });
    return { success: true };
  } catch (insertError) {
    return { success: false };
  }
};

export const recordsMigrate = async (cursor: FindCursor<WithId<Document>>, targetCollection: Collection<Document>) => {
  try {
    while (await cursor.hasNext()) {
      const document = await cursor.next();
      await insertRecords(document, targetCollection);
    }
  } catch (error) {
    return { success: false };
  }

  return { success: true };
};

const executeMongotoMongoMigrateData = async (options: MongotoMongoMigrateExecutorSchema) => {
  const { sourceUri, targetUri, sourceDbName, sourceCollectionName, targetDBName, targetCollectionName } = options;
  const sourceClient = createMongoClient(sourceUri);
  const targetClient = createMongoClient(targetUri);

  try {
    await sourceClient.connect();
    const sourceDb = sourceClient.db(sourceDbName);
    const sourceCollection = sourceDb.collection(sourceCollectionName);

    await targetClient.connect();
    const targetDb = targetClient.db(targetDBName);

    const targetCollection = targetDb.collection(targetCollectionName);

    await targetDb.collection(targetCollectionName).drop();

    const cursor = sourceCollection.find({});

    await recordsMigrate(cursor, targetCollection);

    return { success: true };
  } catch (error) {
    return { success: false };
  } finally {
    await sourceClient.close();
    await targetClient.close();
  }
};

export default executeMongotoMongoMigrateData;
