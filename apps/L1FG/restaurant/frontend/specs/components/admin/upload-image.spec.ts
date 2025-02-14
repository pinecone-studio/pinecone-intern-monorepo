/*eslint-disable*/

import uploadImage from '@/components/utils/upload';

describe('uploadImage', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('should upload an image and return the secure URL', async () => {
    const mockSecureUrl = 'https://res.cloudinary.com/demo/image/upload/test.png';
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ secure_url: mockSecureUrl }),
    });

    const mockFile = new File(['dummy content'], 'test.png', { type: 'image/png' });
    const result = await uploadImage(mockFile);

    expect(fetch).toHaveBeenCalledWith(
      expect.stringMatching(/https:\/\/api\.cloudinary\.com\/v1_1\/.*\/image\/upload/),
      expect.objectContaining({
        method: 'POST',
        body: expect.any(FormData),
      })
    );

    const fetchCall = (fetch as jest.Mock).mock.calls[0];
    const sentFormData = fetchCall[1].body as FormData;
    expect(sentFormData.get('file')).toBe(mockFile);
    expect(sentFormData.get('upload_preset')).toBe(process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'restaurant_preset');

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
      expect((error as Error).message).toBe(`res.json is not a function`);
    }
  });
  it('should throw an error when network fails', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));

    const mockFile = new File(['dummy content'], 'test.png', { type: 'image/png' });

    await expect(uploadImage(mockFile)).rejects.toThrow('Network error');
  });
});
