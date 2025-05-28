import { profileModel } from 'apps/L2B/tinder/tinder-backend/src/models/profile.model';
import { updateProfile } from 'apps/L2B/tinder/tinder-backend/src/resolvers/mutations/profile/update-profile';

jest.mock('apps/L2B/tinder/tinder-backend/src/models/profile.model', () => ({
  profileModel: {
    findOneAndUpdate: jest.fn(),
  },
}));

describe('updateProfile', () => {
  const mockId = 'user123';
  const mockInput = { bio: 'Updated bio', location: 'Earth' };
  const mockUpdatedProfile = { user: mockId, ...mockInput };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return updated profile if found', async () => {
    (profileModel.findOneAndUpdate as jest.Mock).mockResolvedValue(mockUpdatedProfile);

    const result = await updateProfile({}, { id: mockId, input: mockInput });

    expect(profileModel.findOneAndUpdate).toHaveBeenCalledWith({ user: mockId }, { $set: mockInput }, { new: true });
    expect(result).toEqual(mockUpdatedProfile);
  });

  it('should throw an error if profile not found', async () => {
    (profileModel.findOneAndUpdate as jest.Mock).mockResolvedValue(null);

    await expect(updateProfile({}, { id: mockId, input: mockInput })).rejects.toThrow('Profile not found');
  });
});
