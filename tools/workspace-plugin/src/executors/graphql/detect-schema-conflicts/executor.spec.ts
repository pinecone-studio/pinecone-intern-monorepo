import chalk from 'chalk';
import checkForSchemaChangesAndConflicts from './executor';
import { extractSchemaChanges, fetchSchemaDetails, findConflictingNames } from './helper';

jest.mock('child_process');
jest.mock('./helper', () => ({
  fetchSchemaDetails: jest.fn(),
  extractSchemaChanges: jest.fn(),
  findConflictingNames: jest.fn(),
}));
jest.mock('chalk', () => ({
  ...jest.requireActual('chalk'),
  yellow: jest.fn((msg) => msg),
  green: jest.fn((msg) => msg),
  red: jest.fn((msg) => msg),
  cyan: jest.fn((msg) => msg),
  bold: jest.fn((msg) => msg),
}));

describe('detect schema conflicts', () => {
  const mockSchemaDetails = {
    types: ['User', 'Post', 'Comment'],
    queries: ['getUser', 'getPosts'],
    mutations: ['createUser', 'updatePost'],
  };

  const mockSchemaChanges = ['User', 'createUser', 'newType'];
  const mockConflicts = ['User', 'createUser'];

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should detect schema changes and conflicts', async () => {
    (fetchSchemaDetails as jest.Mock).mockResolvedValue(mockSchemaDetails);
    (extractSchemaChanges as jest.Mock).mockReturnValue(mockSchemaChanges);
    (findConflictingNames as jest.Mock).mockReturnValue(mockConflicts);

    const result = await checkForSchemaChangesAndConflicts({ schemaDirectoryPath: 'schemas' });

    expect(fetchSchemaDetails).toHaveBeenCalledTimes(1);
    expect(extractSchemaChanges).toHaveBeenCalledWith('cache/schema_changes.diff');
    expect(findConflictingNames).toHaveBeenCalledWith(mockSchemaDetails, mockSchemaChanges, ['Query', 'Mutation']);
    expect(result.success).toBe(false);
  });

  it('should detect no conflicts when there are no conflicts', async () => {
    (fetchSchemaDetails as jest.Mock).mockResolvedValue(mockSchemaDetails);
    (extractSchemaChanges as jest.Mock).mockReturnValue(mockSchemaChanges);
    (findConflictingNames as jest.Mock).mockReturnValue([]);

    const result = await checkForSchemaChangesAndConflicts({ schemaDirectoryPath: 'schemas' });

    expect(fetchSchemaDetails).toHaveBeenCalledTimes(1);
    expect(extractSchemaChanges).toHaveBeenCalledWith('cache/schema_changes.diff');
    expect(findConflictingNames).toHaveBeenCalledWith(mockSchemaDetails, mockSchemaChanges, ['Query', 'Mutation']);
    expect(result.success).toBe(true);
    expect(chalk.green).toHaveBeenCalledWith('No conflicts detected.');
  });

  it('should handle errors during schema change detection', async () => {
    (fetchSchemaDetails as jest.Mock).mockRejectedValue(new Error('Failed to fetch schema details'));

    const result = await checkForSchemaChangesAndConflicts({ schemaDirectoryPath: 'schemas' });

    expect(fetchSchemaDetails).toHaveBeenCalledTimes(1);
    expect(result.success).toBe(false);
  });
});
