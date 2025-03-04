import { Collection, FindCursor, MongoClient, WithId } from 'mongodb';
import executeMongotoMongoMigrateData, { insertRecords, recordsMigrate } from './executor';
import { MongotoMongoMigrateExecutorSchema } from './schema';

jest.mock('mongodb', () => {
  const mockCollection = jest.fn().mockReturnValue({
    drop: jest.fn(),
    find: jest.fn().mockReturnValue(() => ({
      cursor: {
        hasNext: jest.fn().mockReturnValue(() => ({
          next: jest.fn().mockReturnValue({ _id: 2, name: 'doc2' }),
          insertOne: jest.fn().mockResolvedValue(false),
        })),
      },
    })),
  });
  const mockDb = jest.fn().mockReturnValue({
    collection: mockCollection,
  });

  class MockMongoClient {
    connect = jest.fn().mockResolvedValue(true);
    db = mockDb;
    close = jest.fn();
  }

  return {
    MongoClient: jest.fn().mockImplementation(() => new MockMongoClient()),
    ServerApiVersion: { v1: '1' },
  };
});

const mockOptions: MongotoMongoMigrateExecutorSchema = {
  sourceUri: 'mongodb://sourceUri',
  targetUri: 'mongodb://targetUri',
  sourceDbName: 'sourceDbName',
  sourceCollectionName: 'sourceCollectionName',
  targetDBName: 'targetDBName',
  targetCollectionName: 'targetCollectionName',
};

describe('executeMongotoMongoMigrateData', () => {
  let mockClientInstance;
  beforeEach(() => {
    jest.clearAllMocks();
    mockClientInstance = new MongoClient(null);
  });

  it('should handle errors during data migration', async () => {
    const resultData = await executeMongotoMongoMigrateData(mockOptions);

    expect(resultData).toEqual({ success: true });
  });

  it('should migrate all documents from cursor to targetCollection', async () => {
    const documents = [
      { _id: 1, name: 'doc1' },
      { _id: 2, name: 'doc2' },
    ];

    const cursor: Partial<FindCursor<WithId<Document>>> = {
      hasNext: jest.fn().mockResolvedValueOnce(true).mockResolvedValueOnce(true).mockResolvedValueOnce(false),
      next: jest.fn().mockResolvedValueOnce(documents[0]).mockResolvedValueOnce(documents[1]),
    };

    const targetCollection: Partial<Collection> = {
      insertOne: jest.fn().mockResolvedValue({ acknowledged: true, insertedId: '123' }),
    };

    const result = await recordsMigrate(cursor as FindCursor<WithId<Document>>, targetCollection as Collection);

    expect(result.success).toBe(true);
  });
  it('should return success false when insertion fails', async () => {
    const mockDocument = { _id: 1, name: 'doc1' };
    const mockCollection = {
      insertOne: jest.fn().mockRejectedValue(new Error('Insertion failed')),
    };

    const result = await insertRecords(mockDocument as never, mockCollection as never);

    expect(result).toEqual({ success: false });
    expect(mockCollection.insertOne).toHaveBeenCalledWith(mockDocument, { ignoreUndefined: true });
  });
  it('should return failure when drop collection fails', async () => {
    mockClientInstance.connect.mockResolvedValue(true);
    mockClientInstance.db().collection().drop.mockRejectedValue(new Error('Drop failed'));

    const result = await executeMongotoMongoMigrateData(mockOptions);

    expect(result).toEqual({ success: false });
  });
});
