/* eslint-disable camelcase */
import '@testing-library/jest-dom';
import { UploadImage } from '@/utils/image-upload';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ImageUploadUtil', () => {
  it('should upload an image and return URL', async () => {
    const mockFile = new File(['foodimage'], 'foodimage.png', { type: 'image/png' });

    mockedAxios.post.mockResolvedValue({
      data: {
        secure_url: 'https://localhost/image.png',
      },
    });

    const result = await UploadImage(mockFile);

    expect(result).toBe('https://localhost/image.png');
  });
  it('should return null if the file is undefined', async () => {
    const mockFile = undefined;

    mockedAxios.post.mockResolvedValue({
      data: {
        secure_url: '',
      },
    });

    const result = await UploadImage(mockFile);

    expect(result).toBeNull();
  });

  it('should throw an error when image upload fails', async () => {
    const mockFile = new File(['foodimage'], 'foodimage.png', { type: 'image/png' });
    mockedAxios.post.mockRejectedValue(new Error('Network error'));
    await expect(UploadImage(mockFile)).rejects.toThrow('Зураг оруулахад алдаа гарлаа!');
  });
});
