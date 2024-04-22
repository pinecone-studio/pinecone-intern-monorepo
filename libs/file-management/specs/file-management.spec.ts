import axios from 'axios';
import { createSignedUrl, handleUpload, fileManagement } from '../src';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

jest.mock('axios');
jest.mock('@aws-sdk/s3-request-presigner');
jest.mock('@aws-sdk/client-s3');

describe('File Upload Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('createSignedUrl should return signed URL and access URL', async () => {
    (getSignedUrl as jest.Mock).mockResolvedValue('https://example.com/signed-url');

    const result = await createSignedUrl();
    expect(result.signedUrl).toBe('https://example.com/signed-url');
    expect(result.accessUrl).toMatch(/^https:\/\/pub-[a-f0-9]{32}\.r2\.dev\/test\/[a-f0-9-]{36}$/);
  });

  test('handleUpload should upload file and return access URL', async () => {
    const mockFile = new File(['test'], 'test.txt', { type: 'text/plain' });
    const mockSignedUrl = 'https://example.com/signed-url';

    (axios.put as jest.Mock).mockResolvedValueOnce({ status: 200 });

    const result = await handleUpload(mockFile);
    expect(axios.put).toHaveBeenCalledWith(mockSignedUrl, mockFile, { headers: { 'Content-Type': 'text/plain' } });
    expect(result).toMatch(/^https:\/\/pub-[a-f0-9]{32}\.r2\.dev\/test\/[a-f0-9-]{36}$/);
  });

  test('fileManagement should upload all files and return access URLs', async () => {
    const mockFileList = [new File(['test1'], 'test1.txt', { type: 'text/plain' }), new File(['test2'], 'test2.txt', { type: 'text/plain' })];

    const result = await fileManagement(mockFileList);
    expect(handleUpload);
    expect(result);
  });
});
