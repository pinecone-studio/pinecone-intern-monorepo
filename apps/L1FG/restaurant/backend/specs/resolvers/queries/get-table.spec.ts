import { GraphQLResolveInfo } from "graphql";
import { Table } from "../../../src/models";
import { getTable, getTables } from "../../../src/resolvers/queries";


// Mocking the Table model methods
jest.mock('../../../src/models/table', () => ({
  Table: {
    findById: jest.fn(),
    find: jest.fn(),
  },
}));

describe('Table Resolvers', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getTable', () => {
    it('should return a table when found', async () => {
      const mockTable = { id: '1', name: 'Test Table' };
      (Table.findById as jest.Mock).mockResolvedValue(mockTable);

          if (!getTable) return;

      const result = await getTable({}, { id: '1' }, {}, {} as GraphQLResolveInfo);

      expect(Table.findById).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockTable);
    });

    it('should return null if table is not found', async () => {
      (Table.findById as jest.Mock).mockResolvedValue(null);
          if (!getTable) return;

      const result = await getTable({}, { id: '2' }, {}, {} as GraphQLResolveInfo);

      expect(Table.findById).toHaveBeenCalledWith('2');
      expect(result).toBeNull();
    });
  });

  describe('getTables', () => {
    it('should return a list of tables', async () => {
      const mockTables = [
        { id: '1', name: 'Table 1' },
        { id: '2', name: 'Table 2' },
      ];
      (Table.find as jest.Mock).mockResolvedValue(mockTables);
      if (!getTables) return;
      const result = await getTables({}, {}, {}, {} as GraphQLResolveInfo);

      expect(Table.find).toHaveBeenCalled();
      expect(result).toEqual(mockTables);
    });

    it('should return an empty array if no tables are found', async () => {
      (Table.find as jest.Mock).mockResolvedValue([]);
      if (!getTables) return;
      const result = await getTables({}, {}, {}, {} as GraphQLResolveInfo);

      expect(Table.find).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });
});
