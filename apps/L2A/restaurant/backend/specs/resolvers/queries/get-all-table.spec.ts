import { getAllTables } from '../../../src/resolvers/queries';

jest.mock('../../../src/models/table.model', () => ({
  tableModel: {
    find: jest
      .fn()
      .mockResolvedValueOnce([
        { _id: '1', name: 'Table 1' },
        { _id: '2', name: 'Table 2' },
      ])
      .mockRejectedValueOnce(new Error('DB failure'))
      .mockReturnValueOnce(null),
  },
}));

describe('getAllTables', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a list of tables when found', async () => {
    const result = await getAllTables();

    expect(result).toEqual([
      { _id: '1', name: 'Table 1' },
      { _id: '2', name: 'Table 2' },
    ]);
  });

  it('should throw an error when an exception occurs', async () => {
    await expect(getAllTables()).rejects.toThrow('Error fetching table: DB failure');
  });

  it('should throw an error when an exception occurs', async () => {
    
    await expect(getAllTables()).rejects.toThrow('Tables not found');
  });
});
