import { addTable } from 'apps/L2A/restaurant/backend/src/resolvers/mutations/add-table';
import { tableModel } from 'apps/L2A/restaurant/backend/src/models/table.model';

jest.mock('apps/L2A/restaurant/backend/src/models/table.model');

describe('addTable (current code)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new table and return the promise', async () => {
    const fakeTable = {
      _id: '123',
      name: 'Table 1',
      qrCodeUrl: 'https://example.com/qrcode/123',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
    };
    (tableModel.create as jest.Mock).mockResolvedValue(fakeTable);
    const args = { input: { name: 'Table 1' } };
    const resultPromise = addTable(null, args);
    await expect(resultPromise).resolves.toEqual(fakeTable);
    expect(tableModel.create).toHaveBeenCalledWith({
      name: 'Table 1',
      qrCodeUrl: expect.any(String),
    });
  });

  it('should propagate the error if .create() fails', async () => {
    const error = new Error('Oops!');
    (tableModel.create as jest.Mock).mockRejectedValue(error);
    const args = { input: { name: 'Table 2' } };
    const resultPromise = addTable(null, args);
    await expect(resultPromise).rejects.toThrow('Oops!');
  });
});
