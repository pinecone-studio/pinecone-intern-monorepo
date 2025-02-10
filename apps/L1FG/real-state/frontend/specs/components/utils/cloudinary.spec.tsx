import { uploadImage, uploadImages } from '@/utils/Cloudinary';

describe('Cloudinary Upload', () => {
  const mockFile = new File(['dummy content'], 'sample-image.png', { type: 'image/png' });
  const mockResponse = { secureUrl: 'https://cloudinary.com/test.png' };

  beforeEach(() => {
    global.FormData = jest.fn().mockImplementation(() => ({
      append: jest.fn(),
    }));

    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('uploadImage should upload single file successfully', async () => {
    const result = await uploadImage(mockFile);
    expect(result).toBe(mockResponse.secureUrl);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test('uploadImages should handle multiple files', async () => {
    const mockFileList = {
      0: mockFile,
      1: mockFile,
      length: 2,
      item: () => mockFile,
      [Symbol.iterator]: function* () {
        yield mockFile;
        yield mockFile;
      },
    } as unknown as FileList;

    const results = await uploadImages(mockFileList);
    expect(results).toEqual([mockResponse.secure_url, mockResponse.secure_url]);
    expect(fetch).toHaveBeenCalledTimes(2);
  });

  test('uploadImage should handle errors', async () => {
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: false,
        status: 400,
        statusText: 'Bad Request',
      })
    );

    await expect(uploadImage(mockFile)).rejects.toThrow('Хуулахад алдаа гарлаа');
  });
});
