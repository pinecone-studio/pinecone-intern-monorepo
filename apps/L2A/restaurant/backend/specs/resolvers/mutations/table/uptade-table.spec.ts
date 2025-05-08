import { updateTable } from 'apps/L2A/restaurant/backend/src/resolvers/mutations/uptade-table';
import { tableModel } from 'apps/L2A/restaurant/backend/src/models/table.model';

jest.mock('apps/L2A/restaurant/backend/src/models/table.model');

describe('updateTable', () => {
  const fakeFindByIdAndUpdate = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
    (tableModel.findByIdAndUpdate as jest.Mock) = fakeFindByIdAndUpdate;
  });
  it('should update the table and return it', async () => {
    const fakeTable = {
      _id: '123',
      name: 'Updated Table',
      qrCodeUrl: 'https://example.com/qrcode/123',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-02',
    };
    fakeFindByIdAndUpdate.mockResolvedValue(fakeTable);
    const args = { input: { _id: '123', name: 'Updated Table' } };
    const result = await updateTable(null, args);
    expect(result).toEqual({
      _id: '123',
      name: 'Updated Table',
      qrCodeUrl: 'https://example.com/qrcode/123',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-02',
    });
    expect(fakeFindByIdAndUpdate).toHaveBeenCalledWith('123', { name: 'Updated Table' }, { new: true });
  });

  it('should throw an error if table is not found', async () => {
    fakeFindByIdAndUpdate.mockResolvedValue(null);
    const args = { input: { _id: '999', name: 'Does Not Exist' } };
    await expect(updateTable(null, args)).rejects.toThrow('Table not found.');
    expect(fakeFindByIdAndUpdate).toHaveBeenCalledWith('999', { name: 'Does Not Exist' }, { new: true });
  });

  it('should throw an error if something goes wrong', async () => {
    fakeFindByIdAndUpdate.mockRejectedValue(new Error('DB error'));
    const args = { input: { _id: 'error', name: 'Error Table' } };
    await expect(updateTable(null, args)).rejects.toThrow('Error updating table: DB error');
    expect(fakeFindByIdAndUpdate).toHaveBeenCalledWith('error', { name: 'Error Table' }, { new: true });
  });
});
