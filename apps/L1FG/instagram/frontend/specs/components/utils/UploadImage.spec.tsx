// utils/upload.test.ts

import { uploadImage } from '@/components/utils/upload';

describe('uploadImage', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('should successfully upload an image and return secure_url', async () => {
    const mockSecureUrl = 'https://res.cloudinary.com/example/image/upload/test.jpg';
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      // eslint-disable-next-line camelcase
      json: () => Promise.resolve({ secure_url: mockSecureUrl }),
    });

    const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const result = await uploadImage(mockFile);

    expect(fetch).toHaveBeenCalledWith(
      'https://api.cloudinary.com/v1_1/dqxstnqrf/image/upload',
      expect.objectContaining({
        method: 'POST',
        body: expect.anything(),
      })
    );

    const fetchCall = (fetch as jest.Mock).mock.calls[0];
    const sentFormData = fetchCall[1].body as FormData;
    expect(sentFormData.get('file')).toBe(mockFile);
    expect(sentFormData.get('upload_preset')).toBe('instagram');
    expect(sentFormData.get('cloud_name')).toBe('dqxstnqrf');

    expect(result).toBe(mockSecureUrl);
  });

  it('should throw an error when upload fails', async () => {
    const errorStatusText = 'Internal Server Error';
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      statusText: errorStatusText,
    });

    const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });

    try {
      await uploadImage(mockFile);
      fail('Expected uploadImage to throw an error');
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect((error as Error).message).toBe(`Failed to upload: ${errorStatusText}`);
    }
  });

  it('should throw an error when network fails', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));

    const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });

    try {
      await uploadImage(mockFile);
      fail('Expected uploadImage to throw an error');
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect((error as Error).message).toBe('Network error');
    }
  });
});
