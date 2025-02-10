import { uploadImage, uploadImages } from '@/utils/Cloudinary';

describe('Cloudinary Upload', () => {
  const mockFile = new File(['dummy content'], 'sample-image.png', { type: 'image/png' });
  // eslint-disable-next-line
  const mockResponse = { secure_url: 'https://cloudinary.com/test.png' };

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
    // eslint-disable-next-line
    expect(result).toBe(mockResponse.secure_url);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test('uploadImages should handle multiple files successfully', async () => {
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
    // eslint-disable-next-line
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

  test('uploadImages should handle empty FileList', async () => {
    const mockEmptyFileList = {
      length: 0,
      item: () => null,
    } as unknown as FileList;

    const results = await uploadImages(mockEmptyFileList);
    expect(results).toEqual([]);
    expect(fetch).not.toHaveBeenCalled();
  });

  test('uploadImages should handle undefined response', async () => {
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    );

    const mockFileList = {
      0: mockFile,
      length: 1,
      item: () => mockFile,
      [Symbol.iterator]: function* () {
        yield mockFile;
      },
    } as unknown as FileList;

    const results = await uploadImages(mockFileList);
    expect(results).toEqual([]);
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
