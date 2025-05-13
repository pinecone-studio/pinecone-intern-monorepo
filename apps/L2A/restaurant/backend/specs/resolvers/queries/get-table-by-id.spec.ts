import { getTableById } from '../../../src/resolvers/queries/get-table-by-id';
import { tableModel } from '../../../src/models/table.model';

jest.mock('../../../src/models/table.model');

describe('getTableById', () => {
  const date = new Date();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return table when found with qrCodeUrl', async () => {
    (tableModel.findById as jest.Mock).mockResolvedValue({
      _id: 'abc123',
      name: 'VIP',
      qrCodeUrl: 'some-qr-url',
      createdAt: date,
      updatedAt: date,
    });

    const result = await getTableById(null, { id: 'abc123' });

    expect(result).toEqual({
      _id: 'abc123',
      name: 'VIP',
      qrCodeUrl: 'some-qr-url',
      createdAt: date,
      updatedAt: date,
    });
  });

  it('should return table with empty qrCodeUrl if not defined', async () => {
    (tableModel.findById as jest.Mock).mockResolvedValue({
      _id: 'noqr',
      name: 'No QR Table',
      createdAt: date,
      updatedAt: date,
    });

    const result = await getTableById(null, { id: 'noqr' });

    expect(result).toEqual({
      _id: 'noqr',
      name: 'No QR Table',
      qrCodeUrl: '',
      createdAt: date,
      updatedAt: date,
    });
  });

  it('should throw "Table not found" if no table is returned', async () => {
    (tableModel.findById as jest.Mock).mockResolvedValue(null);

    await expect(getTableById(null, { id: 'missing' })).rejects.toThrow('Table not found');
  });

  it('should throw error if DB fails', async () => {
    (tableModel.findById as jest.Mock).mockRejectedValue(new Error('db error'));

    await expect(getTableById(null, { id: 'fail' })).rejects.toThrow('Error fetching table: db error');
  });
});

