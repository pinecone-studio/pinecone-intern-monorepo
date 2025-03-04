import dotenv from 'dotenv';
import { loadEnvFile } from './load-env-file';

jest.mock('dotenv');
describe('loadEnvFile', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockParsed = { KEY: 'value' };

  it('should load the env file successfully', () => {
    jest.spyOn(dotenv, 'config').mockReturnValue({ parsed: mockParsed });

    loadEnvFile('path/to/.env');
  });

  it('should throw an error if loading the env file fails', () => {
    const mockError = new Error('Failed to load env file');
    jest.spyOn(dotenv, 'config').mockReturnValue({ error: mockError });

    try {
      loadEnvFile('path/to/.env');
    } catch (error) {
      expect(error).toEqual(mockError);
    }
  });
});
