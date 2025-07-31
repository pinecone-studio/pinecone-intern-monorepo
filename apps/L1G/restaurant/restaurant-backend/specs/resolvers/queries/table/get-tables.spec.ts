/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { GraphQLResolveInfo } from 'graphql';
import { TableModel } from 'src/models/table.model';
import { getTables } from 'src/resolvers/queries';
TableModel;

jest.mock('src/models/table.model', () => ({
  TableModel: {
    find: jest.fn().mockResolvedValue([
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
    const result = await getTables!({}, {}, {}, {} as GraphQLResolveInfo);

    expect(result).toEqual([
      {
        tableName: 'test',
        tableQr: 'testQr',
        tableId: '1',
      },
    ]);
  });
});
