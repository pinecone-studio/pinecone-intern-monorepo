import { GraphQLResolveInfo } from 'graphql';
import { getTableByName } from 'src/resolvers/queries';

jest.mock('src/models/table.model', () => ({
  TableModel: {
    findOne: jest
      .fn()
      .mockResolvedValueOnce([
        {
          tableName: 'test',
          tableQr: 'testQr',
          tableId: '1',
        },
      ])
      .mockReturnValueOnce(null),
  },
}));

describe('Get Tables', () => {
  it('should return a Tables', async () => {
    const result = await getTableByName?.({}, { tableName: '1b' }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual([
      {
        tableName: 'test',
        tableQr: 'testQr',
        tableId: '1',
      },
    ]);
  });

  it('should throw error if table does not exist', async () => {
    try {
      await getTableByName?.({}, { tableName: '1b' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('Table with name 1b not found'));
    }
  });
});
