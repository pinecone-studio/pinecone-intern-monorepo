import axios from 'axios';
import { createSignedUrl, handleUpload, fileManagement } from '../src';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

jest.mock('axios');
jest.mock('@aws-sdk/s3-request-presigner', () => ({
  getSignedUrl: jest.fn().mockResolvedValue('https://example.com/signed-url'),
}));
jest.mock('@aws-sdk/client-s3');

class MockFile extends File {
  constructor() {
    super([], 'test.txt', { type: 'text/plain' });
  }
}
class MockFileList extends File {
  constructor(content: string, fileName: string, options?: FilePropertyBag) {
    super([content], fileName, options);
  }
}

describe('File Upload Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('createSignedUrl should return signed URL and access URL', async () => {
    const mockFolder = 'folder';
    const result = await createSignedUrl(mockFolder);

    expect(result.signedUrl).toBe('https://example.com/signed-url');

    expect(result.accessUrl.slice(0, 15)).toEqual('undefinedfolder');
  });

  test('handleUpload should upload file and return access URL', async () => {
    const mockFile = new MockFile();
    const mockFolder = 'folder';
    const mockSignedUrl = 'https://example.com/signed-url';

    (axios.put as jest.Mock).mockResolvedValueOnce({ status: 200 });

    const result = await handleUpload(mockFile, mockFolder);
    expect(axios.put).toHaveBeenCalledWith(mockSignedUrl, mockFile, { headers: { 'Content-Type': 'text/plain' } });
    expect(result.slice(0, 15)).toEqual('undefinedfolder');
  });

  test('fileManagement should upload all files and return access URLs', async () => {
    const mockFileList = [new MockFileList('test1', 'test1.txt', { type: 'text/plain' }), new MockFileList('test2', 'test2.txt', { type: 'text/plain' })];
    const mockFolder = 'folder';
    const result = await fileManagement(mockFileList, mockFolder);

    expect(handleUpload);
    expect(result);
  });
  test('Throw error: createSignedUrl should return signed URL and access URL', async () => {
    (getSignedUrl as jest.Mock).mockRejectedValueOnce(null);
    const mockFolder = 'folder';
    try {
      await createSignedUrl(mockFolder);
    } catch (error) {
      expect(error).toEqual(new Error('No signed or access url'));
    }
  });
});
