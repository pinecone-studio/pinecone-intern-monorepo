import { profileModel } from 'apps/L2B/tinder/tinder-backend/src/models';
import { fetchProfile } from 'apps/L2B/tinder/tinder-backend/src/resolvers/queries';

jest.mock('apps/L2B/tinder/tinder-backend/src/models', () => ({
  profileModel: {
    findById: jest.fn(),
  },
}));

describe('fetchProfile', () => {
  const mockProfile = {
    _id: '123',
    name: 'Test User',
    matched: [{ _id: '456', name: 'Matched User' }],
    user: { _id: '789', username: 'testuser' },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return profile when found', async () => {
    const populateMatched = jest.fn().mockResolvedValue(mockProfile);
    const populateUser = jest.fn().mockReturnValue({ populate: populateMatched });

    (profileModel.findById as jest.Mock).mockReturnValue({ populate: populateUser });

    const result = await fetchProfile(null, { _id: '123' });

    expect(profileModel.findById).toHaveBeenCalledWith('123');
    expect(populateUser).toHaveBeenCalledWith('user');
    expect(populateMatched).toHaveBeenCalledWith('matched');
    expect(result).toEqual(mockProfile);
  });

  it('should throw an error if profile not found', async () => {
    const populateMatched = jest.fn().mockResolvedValue(null);
    const populateUser = jest.fn().mockReturnValue({ populate: populateMatched });

    (profileModel.findById as jest.Mock).mockReturnValue({ populate: populateUser });

    await expect(fetchProfile(null, { _id: 'notfound' })).rejects.toThrow('Profile not found');
  });
});
