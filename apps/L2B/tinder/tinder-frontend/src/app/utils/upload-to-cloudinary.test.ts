import { uploadToCloudinary } from './upload-to-cloudinary';

describe('uploadToCloudinary', () => {
  const OLD_ENV = process.env;

  const dummyFile = new File(['dummy content'], 'dummy.png', { type: 'image/png' });

  beforeEach(() => {
    jest.resetModules(); // Reset cache
    process.env = { ...OLD_ENV }; // Clone original env
    process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME = 'preset';
    process.env.NEXT_PUBLIC_CLOUDINARY_NAME = 'cloudname';
     jest.spyOn(window, 'alert').mockImplementation(() => {});
    jest.clearAllMocks();
  });

  afterAll(() => {
    process.env = OLD_ENV; // Restore original env
  });

  it('returns undefined if no files are provided', async () => {
    const result = await uploadToCloudinary([], '123');
    expect(result).toBeUndefined();
  });

  it('returns undefined if Cloudinary config is missing', async () => {
    process.env.NEXT_PUBLIC_CLOUDINARY_NAME = '';
    process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME = '';
    const result = await uploadToCloudinary([dummyFile], '123');
    expect(result).toBeUndefined();
  });

  it('uploads file successfully and returns URLs', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ secure_url: 'http://cloudinary.com/fake-url.png' }),
      })
    ) as jest.Mock;

    const result = await uploadToCloudinary([dummyFile], '123');
    expect(result).toEqual(['http://cloudinary.com/fake-url.png']);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('handles upload failure and returns null for failed upload', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {}); // silence error logs
    global.fetch = jest.fn(() => Promise.reject(new Error('Network error'))) as jest.Mock;

    const result = await uploadToCloudinary([dummyFile], '123');
    expect(result).toEqual([]); // filters out null
  });
});
