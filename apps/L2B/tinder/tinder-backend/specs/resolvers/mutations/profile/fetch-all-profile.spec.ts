import { profileModel } from 'apps/L2B/tinder/tinder-backend/src/models';
import { fetchAllProfile } from 'apps/L2B/tinder/tinder-backend/src/resolvers/queries';

jest.mock('apps/L2B/tinder/tinder-backend/src/models/profile.model', () => ({
  profileModel: {
    find: jest.fn(),
  },
}));

describe('fetchAllProfile', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return profiles with populated user', async () => {
    const mockProfiles = [
      {
        _id: 'profile1',
        profileInfo: { name: 'User One' },
        user: { _id: 'user1', email: 'user1@example.com' },
      },
      {
        _id: 'profile2',
        profileInfo: { name: 'User Two' },
        user: { _id: 'user2', email: 'user2@example.com' },
      },
    ];

    const populateMock = jest.fn().mockResolvedValue(mockProfiles);
    (profileModel.find as jest.Mock).mockReturnValue({ populate: populateMock });

    const result = await fetchAllProfile();

    expect(profileModel.find).toHaveBeenCalled();
    expect(populateMock).toHaveBeenCalledWith('user');
    expect(result).toEqual(mockProfiles);
  });

  it('should throw an error if no profiles found', async () => {
    const populateMock = jest.fn().mockResolvedValue(null);
    (profileModel.find as jest.Mock).mockReturnValue({ populate: populateMock });

    await expect(fetchAllProfile()).rejects.toThrow('Profiles not found');
    expect(profileModel.find).toHaveBeenCalled();
    expect(populateMock).toHaveBeenCalledWith('user');
  });
});
