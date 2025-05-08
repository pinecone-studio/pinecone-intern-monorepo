import { addTable } from 'apps/L2A/restaurant/backend/src/resolvers/mutations/add-table';
import { tableModel } from 'apps/L2A/restaurant/backend/src/models/table.model';

jest.mock('apps/L2A/restaurant/backend/src/models/table.model');

describe('addTable', () => {
  const fakeSave = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (tableModel as unknown as jest.Mock).mockImplementation(() => ({
      save: fakeSave,
    }));
  });

  it('should create a new table and return it', async () => {
    const fakeTable = {
      _id: '123',
      name: 'Table 1',
      qrCodeUrl: 'https://example.com/qrcode/123',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
    };
    fakeSave.mockResolvedValue(fakeTable);
    const args = { input: { name: 'Table 1' } };
    const result = await addTable(null, args);
    expect(result).toEqual({
      _id: '123',
      name: 'Table 1',
      qrCodeUrl: 'https://example.com/qrcode/123',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
    });
    expect(tableModel).toHaveBeenCalledWith({
      name: 'Table 1',
      qrCodeUrl: expect.stringContaining('https://example.com/qrcode/'),
    });
    expect(fakeSave).toHaveBeenCalled();
  });

  it('should throw an error if something goes wrong', async () => {
    fakeSave.mockRejectedValue(new Error('Oops!'));
    const args = { input: { name: 'Table 2' } };
    await expect(addTable(null, args)).rejects.toThrow('Error creating product: Oops!');
  });
});
