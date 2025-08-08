import { Usermodel } from 'src/models/user';
import { uploadImages } from 'src/resolvers/mutations/image-upload';

jest.mock('src/models/user');

describe('uploadImages Mutation Resolver', () => {
  const mockImages = ['url1', 'url2'];
  const mockUserId = 'user123';

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update user images and return updated user', async () => {
    const mockUpdatedUser = { id: mockUserId, images: ['existing', ...mockImages] };

    (Usermodel.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockUpdatedUser);

    const result = await uploadImages(null, { images: mockImages }, { userId: mockUserId });

    expect(Usermodel.findByIdAndUpdate).toHaveBeenCalledWith(mockUserId, { $push: { images: { $each: mockImages } } }, { new: true });

    expect(result).toEqual(mockUpdatedUser);
  });

  it('should throw "Failed to upload images" if userId is missing', async () => {
    await expect(uploadImages(null, { images: mockImages }, {} as any)).rejects.toThrow('Failed to upload images');

    expect(Usermodel.findByIdAndUpdate).not.toHaveBeenCalled();
  });

  it('should throw "Failed to upload images" if user is not found', async () => {
    (Usermodel.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

    await expect(uploadImages(null, { images: mockImages }, { userId: mockUserId })).rejects.toThrow('Failed to upload images');
  });

  it('should throw "Failed to upload images" on unexpected error', async () => {
    const error = new Error('DB error');
    (Usermodel.findByIdAndUpdate as jest.Mock).mockRejectedValue(error);

    await expect(uploadImages(null, { images: mockImages }, { userId: mockUserId })).rejects.toThrow('Failed to upload images');
  });
});
