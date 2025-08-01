import { GraphQLResolveInfo } from 'graphql';
import { createTable } from 'src/resolvers/mutations';

jest.mock('src/models/table.model', () => ({
  TableModel: {
    create: jest.fn().mockReturnValue({
      tableId: '1',
      tableName: '2b',
      tableQR: 'testQr',
    }),
    findOne: jest.fn().mockResolvedValueOnce({ tableName: '2b' }),
  },
}));

describe('createTable', () => {
  it('should throw an error, if table is already exist', async () => {
    try {
      await createTable!({}, { input: { tableName: '2b' } }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('table already exists'));
    }
  });

  it('should create a new table', async () => {
    const result = await createTable!({}, { input: { tableName: '2b' } }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      tableId: '1',
      tableName: '2b',
      tableQR: 'testQr',
    });
  });
});
