import { GraphQLResolveInfo } from 'graphql';
import { getTables } from 'src/resolvers/queries';

jest.mock('src/models/table.model', () => ({
  TableModel: {
    find: jest.fn().mockResolvedValueOnce([
      {
        tableName: 'test',
        tableQr: 'testQr',
        tableId: '1',
      },
    ]),
  },
}));

describe('Get Tables', () => {
  it('should return a Tables', async () => {
    const result = await getTables?.({}, {}, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual([
      {
        tableName: 'test',
        tableQr: 'testQr',
        tableId: '1',
      },
    ]);
  });
});
