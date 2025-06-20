import { profileModel } from 'apps/L2B/tinder/tinder-backend/src/models';
import { dislike } from 'apps/L2B/tinder/tinder-backend/src/resolvers/mutations';

jest.mock('apps/L2B/tinder/tinder-backend/src/models', () => ({
  profileModel: {
    findById: jest.fn(),
  },
}));

describe('dislike mutation', () => {
  const mockSave = jest.fn();
  const baseMockProfile = {
    save: mockSave,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should dislike a user and save the profile', async () => {
    const mockProfile = {
      ...baseMockProfile,
      disliked: [],
    };

    (profileModel.findById as jest.Mock).mockResolvedValue(mockProfile);

    const result = await dislike(null, {
      fromUserId: 'userA',
      toUserId: 'userB',
    });

    expect(profileModel.findById).toHaveBeenCalledWith('userA');
    expect(mockProfile.disliked).toContain('userB');
    expect(mockSave).toHaveBeenCalled();
    expect(result).toBe('User disliked successfully');
  });

  it('should handle when disliked is initially undefined', async () => {
    const mockProfile = {
      ...baseMockProfile,
      disliked: undefined,
    };

    (profileModel.findById as jest.Mock).mockResolvedValue(mockProfile);

    const result = await dislike(null, {
      fromUserId: 'userA',
      toUserId: 'userB',
    });

    expect(mockProfile.disliked).toEqual(['userB']);
    expect(mockSave).toHaveBeenCalled();
    expect(result).toBe('User disliked successfully');
  });

  it('should throw an error if profile is not found', async () => {
    (profileModel.findById as jest.Mock).mockResolvedValue(null);

    await expect(dislike(null, { fromUserId: 'userA', toUserId: 'userB' })).rejects.toThrow('profile not found');
  });
});
