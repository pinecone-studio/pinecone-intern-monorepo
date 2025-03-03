import { FollowerModel, UserModel } from '../../../../src/models';
import { getUserByName } from '../../../../src/resolvers/queries';

jest.mock('../../../../src/models', () => ({
  UserModel: { aggregate: jest.fn() },
  FollowerModel: { distinct: jest.fn() },
}));

describe('getUserByName', () => {
  const mockUserId = 'user123';
  const mockUserName = 'testUser';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should throw UnauthenticatedError if user is not authenticated', async () => {
    if (!getUserByName) return;

    await expect(getUserByName({}, { userName: mockUserName }, { userId: null }, {})).rejects.toThrow('Нэвтэрнэ үү');
  });

  it('should return users with mutual followers count', async () => {
    const mockFollowings = ['userA', 'userB'];
    const mockUsers = [
      {
        _id: 'user456',
        fullName: 'John Doe',
        userName: 'johndoe',
        profileImage: 'profile.jpg',
        seenStoryTime: '2025-02-14T12:00:00Z',
        latestStoryTimestamp: '2025-02-14T11:45:00Z',
        followerCount: 100,
        mutualFollowersCount: 1,
        mutualFollowers: 'userA',
      },
    ];

    (FollowerModel.distinct as jest.Mock).mockResolvedValue(mockFollowings);
    (UserModel.aggregate as jest.Mock).mockResolvedValue(mockUsers);

    if (!getUserByName) return;

    const result = await getUserByName({}, { userName: mockUserName }, { userId: mockUserId }, {});

    expect(FollowerModel.distinct).toHaveBeenCalledWith('followerId', { targetId: mockUserId });
    expect(UserModel.aggregate).toHaveBeenCalled();
    expect(result).toEqual(mockUsers);
  });

  it('should return an empty array if no users are found', async () => {
    (FollowerModel.distinct as jest.Mock).mockResolvedValue([]);
    (UserModel.aggregate as jest.Mock).mockResolvedValue([]);

    const result = await getUserByName({}, { userName: mockUserName }, { userId: mockUserId }, {});

    expect(result).toEqual([]);
  });

  it('should throw a GraphQLError with "server error"', async () => {
    (UserModel.aggregate as jest.Mock).mockRejectedValue('Unexpected error');

    await expect(getUserByName({}, { userName: 'testUser' }, { userId: 'someUserId' }, {})).rejects.toThrow('server error');
  });

  it('should handle errors and throw GraphQLError', async () => {
    (UserModel.aggregate as jest.Mock).mockRejectedValue(new Error('Database error'));

    await expect(getUserByName({}, { userName: mockUserName }, { userId: mockUserId }, {})).rejects.toThrow('Database error');
  });
});
