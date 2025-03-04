import { execSync } from 'child_process';
import { getTableNames, runCommand } from './utils';

jest.mock('child_process', () => ({
  execSync: jest.fn(),
}));

jest.mock('process', () => ({
  exit: jest.fn(),
}));

describe('getTableNames', () => {
  it('should extract table names correctly', () => {
    const mockDbResult = `
      [{"tbl_name": "table1"}, {"tbl_name": "_internalTable"}, {"tbl_name": "table2"}]
    `;

    (execSync as jest.Mock).mockReturnValue(mockDbResult);

    const result = getTableNames('test-db');

    expect(result).toEqual(['table1', 'table2']);
    expect(execSync).toHaveBeenCalledWith('npx wrangler d1 execute test-db --command "SELECT tbl_name FROM sqlite_master WHERE type=\'table\'" --remote', { encoding: 'utf-8' });
  });

  it('should return an empty array if no table names are found', () => {
    const mockDbResult = '[]';

    (execSync as jest.Mock).mockReturnValue(mockDbResult);

    const result = getTableNames('test-db');

    expect(result).toEqual([]);
  });

  it('should handle empty or malformed result gracefully', () => {
    const mockDbResult = '';

    (execSync as jest.Mock).mockReturnValue(mockDbResult);

    const result = getTableNames('test-db');

    expect(result).toEqual([]);
  });

  it('should handle invalid JSON format gracefully', () => {
    const mockDbResult = 'Invalid JSON response';

    (execSync as jest.Mock).mockReturnValue(mockDbResult);

    const result = getTableNames('test-db');

    expect(result).toEqual([]);
  });

  it('should filter out tables starting with an underscore', () => {
    const mockDbResult = `
      [{"tbl_name": "_tempTable1"}, {"tbl_name": "_internalTable"}, {"tbl_name": "validTable"}]
    `;

    (execSync as jest.Mock).mockReturnValue(mockDbResult);

    const result = getTableNames('test-db');

    expect(result).toEqual(['validTable']);
  });

  it('should run the command successfully', () => {
    const mockCommand = 'echo "Success"';

    runCommand(mockCommand);
  });
});
