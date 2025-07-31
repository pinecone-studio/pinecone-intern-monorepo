import { GraphQLResolveInfo } from 'graphql';
import { updateTable } from 'src/resolvers/mutations';

jest.mock('src/models/table.model', () => ({
  TableModel: {
    findByIdAndUpdate: jest
      .fn()
      .mockReturnValue({
        tableName: 'test',
        tableQR: 'testQr',
        tableId: '1',
      })
      .mockReturnValueOnce(null),
  },
}));

jest.mock('qrcode', () => ({
  toDataURL: jest.fn().mockResolvedValue('testQr'),
}));

describe('updateTable', () => {
  +it('should throw error if table does not exist', async () => {
    await expect(updateTable!({}, { tableId: '1', input: { tableName: 'test', tableQR: 'testQr' } }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('Table with ID 1 not found');
  });

  it('should update table', async () => {
    const result = await updateTable!({}, { tableId: '1', input: { tableName: 'test', tableQR: 'testQr' } }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      tableName: 'test',
      tableQR: 'testQr',
      tableId: '1',
    });
  });
});
