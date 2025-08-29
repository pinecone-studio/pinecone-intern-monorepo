import { GraphQLResolveInfo } from 'graphql';
import { deleteTable } from 'src/resolvers/mutations';

jest.mock('src/models/table.model', () => ({
  TableModel: {
    findByIdAndDelete: jest
      .fn()
      .mockReturnValueOnce({
        tableName: 'test',
        tableQR: 'testQr',
        tableId: '1',
      })
      .mockReturnValueOnce(null),
  },
}));

describe('delete table', () => {
  it('should delete table by id', async () => {
    const result = await deleteTable?.({}, { tableId: '1' }, {}, {} as GraphQLResolveInfo);

    expect(result).toEqual({
      tableName: 'test',
      tableQR: 'testQr',
      tableId: '1',
    });
  });

  it('should throw error if table does not exist', async () => {
    try {
      await deleteTable?.({}, { tableId: '1' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('Table with ID 1 not found'));
    }
  });
});
