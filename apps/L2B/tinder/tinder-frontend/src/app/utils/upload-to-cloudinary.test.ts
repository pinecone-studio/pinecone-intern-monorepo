import { uploadToCloudinary } from './upload-to-cloudinary';

describe('uploadToCloudinary', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
    process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME = 'test_preset';
    process.env.NEXT_PUBLIC_CLOUDINARY_NAME = 'test_cloud_name';

    global.alert = jest.fn();
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
    process.env = OLD_ENV;
  });

  it('alerts and returns undefined if files array is empty', async () => {
    const result = await uploadToCloudinary([], 'user1');
    expect(global.alert).toHaveBeenCalledWith('Please select files');
    expect(result).toBeUndefined();
  });

  it('alerts and returns undefined if env variables missing', async () => {
    process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME = '';
    process.env.NEXT_PUBLIC_CLOUDINARY_NAME = '';

    const file = new File(['dummy content'], 'test.png', { type: 'image/png' });

    const result = await uploadToCloudinary([file], 'user1');
    expect(global.alert).toHaveBeenCalledWith('Cloudinary configuration is missing');
    expect(result).toBeUndefined();
  });

  it('uploads files and returns array of URLs', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      // eslint-disable-next-line camelcase
      json: () => Promise.resolve({ secure_url: 'https://cloudinary.com/image1.png' }),
    });

    const file = new File(['dummy content'], 'test.png', { type: 'image/png' });

    const result = await uploadToCloudinary([file], 'user1');

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(result).toEqual(['https://cloudinary.com/image1.png']);
  });

  it('filters out null URLs when upload fails', async () => {
    (global.fetch as jest.Mock)
      .mockImplementationOnce(() =>
        Promise.resolve({
          // eslint-disable-next-line camelcase
          json: () => Promise.resolve({ secure_url: 'https://cloudinary.com/image1.png' }),
        })
      )
      .mockImplementationOnce(() => Promise.reject(new Error('Upload error')));

    const file1 = new File(['dummy1'], 'test1.png', { type: 'image/png' });
    const file2 = new File(['dummy2'], 'test2.png', { type: 'image/png' });

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);

    const result = await uploadToCloudinary([file1, file2], 'user1');

    expect(result).toEqual(['https://cloudinary.com/image1.png']);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Upload failed for file:',
      'test2.png',
      expect.any(Error)
    );

    consoleErrorSpy.mockRestore();
  });

  it('returns empty array if upload response has no secure_url', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      json: () => Promise.resolve({}),
    });

    const file = new File(['dummy'], 'file.png', { type: 'image/png' });

    const result = await uploadToCloudinary([file], 'user1');

    expect(result).toEqual([]);
  });
});
