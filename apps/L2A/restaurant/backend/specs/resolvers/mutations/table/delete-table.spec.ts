import { deleteTable } from 'apps/L2A/restaurant/backend/src/resolvers/mutations/delete-table';
import { tableModel } from 'apps/L2A/restaurant/backend/src/models/table.model';

jest.mock('apps/L2A/restaurant/backend/src/models/table.model');

describe('deleteTable', () => {
  const fakeFindByIdAndDelete = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
    (tableModel.findByIdAndDelete as jest.Mock) = fakeFindByIdAndDelete;
  });

  it('should delete a table and return it', async () => {
    const fakeTable = {
      _id: '123',
      name: 'Table 1',
      qrCodeUrl: 'https://example.com/qrcode/123',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
    };
    fakeFindByIdAndDelete.mockResolvedValue(fakeTable);
    const args = { input: { _id: '123' } };
    const result = await deleteTable(null, args);
    expect(result).toEqual(fakeTable);
    expect(fakeFindByIdAndDelete).toHaveBeenCalledWith('123');
  });

  it('should throw an error if table is not found', async () => {
    fakeFindByIdAndDelete.mockResolvedValue(null);
    const args = { input: { _id: '999' } };
    await expect(deleteTable(null, args)).rejects.toThrow('Table not found.');
    expect(fakeFindByIdAndDelete).toHaveBeenCalledWith('999');
  });

  it('should throw an error if something goes wrong', async () => {
    fakeFindByIdAndDelete.mockRejectedValue(new Error('DB error'));
    const args = { input: { _id: 'error' } };
    await expect(deleteTable(null, args)).rejects.toThrow('Error deleting table: DB error');
    expect(fakeFindByIdAndDelete).toHaveBeenCalledWith('error');
  });
});
