import { profileModel } from 'apps/L2B/tinder/tinder-backend/src/models';
import { like } from 'apps/L2B/tinder/tinder-backend/src/resolvers/mutations';

jest.mock('apps/L2B/tinder/tinder-backend/src/models', () => ({
  profileModel: {
    findById: jest.fn(),
  },
}));

describe('like function', () => {
  let fromProfileMock: any;
  let toProfileMock: any;

  beforeEach(() => {
    fromProfileMock = {
      liked: [],
      matched: [],
      save: jest.fn(),
    };

    toProfileMock = {
      liked: [],
      matched: [],
      save: jest.fn(),
    };

    jest.clearAllMocks();
  });

  it('should like a user without a match', async () => {
    (profileModel.findById as jest.Mock).mockResolvedValueOnce(fromProfileMock).mockResolvedValueOnce(toProfileMock);

    const result = await like(null, { fromUserId: 'user1', toUserId: 'user2' });

    expect(fromProfileMock.liked).toContain('user2');
    expect(fromProfileMock.save).toHaveBeenCalledTimes(1);
    expect(toProfileMock.save).not.toHaveBeenCalled();
    expect(result).toBe('User liked successfully');
  });

  it('should like and match users if toProfile already liked fromUser', async () => {
    toProfileMock.liked = ['user1'];

    (profileModel.findById as jest.Mock).mockResolvedValueOnce(fromProfileMock).mockResolvedValueOnce(toProfileMock);

    const result = await like(null, { fromUserId: 'user1', toUserId: 'user2' });

    expect(fromProfileMock.liked).toContain('user2');
    expect(fromProfileMock.matched).toContain('user2');
    expect(toProfileMock.matched).toContain('user1');
    expect(fromProfileMock.save).toHaveBeenCalledTimes(2); // first like, then match
    expect(toProfileMock.save).toHaveBeenCalledTimes(1); // only after match
    expect(result).toBe('Match occurred! 🎉');
  });

  it('should throw an error if one or both profiles not found', async () => {
    (profileModel.findById as jest.Mock).mockResolvedValueOnce(null); // fromProfile is null

    await expect(like(null, { fromUserId: 'user1', toUserId: 'user2' })).rejects.toThrow('One or both profiles not found');
  });
});
