import { profileModel } from 'apps/L2B/tinder/tinder-backend/src/models/profile.model';
import { updateProfileImage } from 'apps/L2B/tinder/tinder-backend/src/resolvers/mutations/profile/update-image';

jest.mock('apps/L2B/tinder/tinder-backend/src/models/profile.model', () => ({
  profileModel: {
    findOneAndUpdate: jest.fn(),
  },
}));

describe('updateProfileImage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should set image and return updated profile', async () => {
    const mockProfile = {
      _id: 'profile1',
      user: 'user123',
      images: ['img2.png'],
    };

    (profileModel.findOneAndUpdate as jest.Mock).mockResolvedValue(mockProfile);

    const result = await updateProfileImage(null, {
      userId: 'user123',
      images: 'img2.png',
    });

    expect(profileModel.findOneAndUpdate).toHaveBeenCalledWith({ user: 'user123' }, { $set: { images: ['img2.png'] } }, { new: true });

    expect(result).toEqual(mockProfile);
  });

  it('should throw error if profile not found', async () => {
    (profileModel.findOneAndUpdate as jest.Mock).mockResolvedValue(null);

    await expect(
      updateProfileImage(null, {
        userId: 'nonexistent-user',
        images: 'img.png',
      })
    ).rejects.toThrow('Profile not found. Please create a profile first.');
  });
});
