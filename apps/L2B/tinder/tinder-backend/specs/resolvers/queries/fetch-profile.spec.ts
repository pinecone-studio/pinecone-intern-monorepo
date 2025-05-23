import { fetchProfile } from '../../../src/resolvers/queries/fetch-profile';
import { profileModel } from '../../../src/models/profile.model';

jest.mock('../../../src/models/profile.model', () => ({
  profileModel: {
    findById: jest.fn(),
  },
}));

describe('Profile Query Resolver - fetchProfile', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return a profile by ID with populated user', async () => {
    const mockProfile = {
      _id: 'profile123',
      profileInfo: { name: 'Test User' },
      user: { _id: 'user123', email: 'test@example.com' },
    };

    const populateMock = jest.fn().mockResolvedValueOnce(mockProfile);
    (profileModel.findById as jest.Mock).mockReturnValue({ populate: populateMock });

    const result = await fetchProfile({}, { _id: 'profile123' });

    expect(profileModel.findById).toHaveBeenCalledWith('profile123');
    expect(populateMock).toHaveBeenCalledWith('user');
    expect(result).toEqual(mockProfile);
  });

  it('should throw an error if profile is not found', async () => {
    const populateMock = jest.fn().mockResolvedValueOnce(null);
    (profileModel.findById as jest.Mock).mockReturnValue({ populate: populateMock });

    await expect(fetchProfile({}, { _id: 'nonexistent' })).rejects.toThrow('Profile not found');
    expect(profileModel.findById).toHaveBeenCalledWith('nonexistent');
  });
});
