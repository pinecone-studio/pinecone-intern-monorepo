import { userModel } from '../../../src/models/user/user.model';
import { deleteImage } from '../../../src/resolvers/mutations/profileUser/delete-images';

jest.mock('../../../src/models/user/user.model.ts');

describe('deleteImage mutation', () => {
  it('should delete the specified image from the user', async () => {
    const mockUser = {
      _id: 'user123',
      images: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
      save: jest.fn(),
    };

    userModel.findById = jest.fn().mockResolvedValue(mockUser);

    const input = {
      image: 'image1.jpg',
    };

    const result = await deleteImage({}, { _id: 'user123', input });

    expect(result.images).toEqual(['image2.jpg', 'image3.jpg']);
    expect(mockUser.save).toHaveBeenCalled();
  });

  it('should throw an error if the image is not found in the user profile', async () => {
    const mockUser = {
      _id: 'user123',
      images: ['image2.jpg', 'image3.jpg'],
      save: jest.fn(),
    };

    (userModel.findById as jest.Mock).mockResolvedValue(mockUser);

    const input = {
      image: 'image1.jpg',
    };

    await expect(deleteImage({}, { _id: 'user123', input })).rejects.toThrow('Image not found in user profile');
  });

  it('should throw an error if user is not found', async () => {
    userModel.findById = jest.fn().mockResolvedValue(null);

    const input = {
      image: 'image1.jpg',
    };

    await expect(deleteImage(undefined, { _id: 'user123', input })).rejects.toThrow('User not found');
  });
});
