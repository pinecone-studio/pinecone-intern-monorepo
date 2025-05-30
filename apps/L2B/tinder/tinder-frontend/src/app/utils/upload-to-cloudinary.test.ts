import { uploadToCloudinary } from './upload-to-cloudinary';

beforeAll(() => {
  global.alert = jest.fn();
});

describe('uploadToCloudinary', () => {
  const OLD_ENV = process.env;

  const dummyFile = new File(['dummy content'], 'dummy.png', { type: 'image/png' });

  beforeEach(() => {
    jest.resetModules(); 
    process.env = { ...OLD_ENV }; 
    process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME = 'preset';
    process.env.NEXT_PUBLIC_CLOUDINARY_NAME = 'cloudname';
    
    jest.clearAllMocks();
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it('returns undefined if no files are provided', async () => {
    const result = await uploadToCloudinary([], '123');
    expect(result).toBeUndefined();
  });

 it('alerts and returns undefined if no files are provided', async () => {
  const result = await uploadToCloudinary([], '123');
  expect(global.alert).toHaveBeenCalledWith('Please select files');
  expect(result).toBeUndefined();
});

it('alerts and returns undefined if Cloudinary config is missing', async () => {
  process.env.NEXT_PUBLIC_CLOUDINARY_NAME = '';
  process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME = '';
  const result = await uploadToCloudinary([dummyFile], '123');
  expect(global.alert).toHaveBeenCalledWith('Cloudinary configuration is missing');
  expect(result).toBeUndefined();
});

it('handles upload failure and logs error', async () => {
// eslint-disable-next-line @typescript-eslint/no-empty-function
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  global.fetch = jest.fn(() => Promise.reject(new Error('Network error'))) as jest.Mock;

  const result = await uploadToCloudinary([dummyFile], '123');
  expect(result).toEqual([]);
  expect(consoleSpy).toHaveBeenCalledWith(
    'Upload failed for file:',
    dummyFile.name,
    expect.any(Error)
  );

  consoleSpy.mockRestore();
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
        // eslint-disable-next-line @typescript-eslint/naming-convention 
        // eslint-disable-next-line camelcase
        json: () => Promise.resolve({ secure_url: 'http://cloudinary.com/fake-url.png' }),
      })
    ) as jest.Mock;

    const result = await uploadToCloudinary([dummyFile], '123');
    expect(result).toEqual(['http://cloudinary.com/fake-url.png']);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('handles upload failure and returns null for failed upload', async () => {
  
    global.fetch = jest.fn(() => Promise.reject(new Error('Network error'))) as jest.Mock;

    const result = await uploadToCloudinary([dummyFile], '123');
    expect(result).toEqual([]); 
  });
});
