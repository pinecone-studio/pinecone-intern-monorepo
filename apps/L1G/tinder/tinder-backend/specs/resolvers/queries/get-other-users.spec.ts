/* eslint max-lines: "off" */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Usermodel } from 'src/models/user';
import { MatchModel } from 'src/models/match';
import { Types } from 'mongoose';
import { getOtherUsers } from 'src/resolvers/queries/get-other-users';

jest.mock('src/models/user');
jest.mock('src/models/match');

describe('getOtherUsers', () => {
  const userId = new Types.ObjectId().toString();
  const likedByUserId = new Types.ObjectId();
  const likedToUserId = new Types.ObjectId();
  const matchedUserId = new Types.ObjectId();

  const mockCurrentUser = {
    _id: userId,
    email: 'current@example.com',
    likedBy: [{ _id: likedByUserId, name: 'LikedBy User' }],
    likedTo: [{ _id: likedToUserId, name: 'LikedTo User' }],
  };

  const mockUserFind = (users: any[]) => {
    // @ts-ignore
    Usermodel.find.mockReturnValueOnce({
      populate: jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnValue({
          populate: jest.fn().mockReturnValue({
            populate: jest.fn().mockReturnValue({
              lean: jest.fn().mockResolvedValue(users),
            }),
          }),
        }),
      }),
    });
  };

  beforeEach(() => {
    jest.clearAllMocks();

    // @ts-ignore
    Usermodel.findById.mockReturnValue({
      populate: jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnValue({
          lean: jest.fn().mockResolvedValue(mockCurrentUser),
        }),
      }),
    });

    // @ts-ignore
    MatchModel.find.mockReturnValue({
      lean: jest.fn().mockResolvedValue([{ users: [userId, matchedUserId.toString()], unmatched: false }]),
    });
  });

  it('should return users excluding current user, liked users, and matched users', async () => {
    const otherUserId1 = new Types.ObjectId();
    mockUserFind([
      {
        _id: otherUserId1,
        name: 'Alice',
        email: 'alice@example.com',
        images: ['img1.png'],
        interests: [{ _id: new Types.ObjectId(), interestName: 'Coding' }],
        likedBy: [],
        likedTo: [],
        matchIds: []
      }
    ]);

    const result = await getOtherUsers(null, { _id: userId });

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(otherUserId1.toString());
    expect(result[0].name).toBe('Alice');
    expect(result[0].interests[0].interestName).toBe('Coding');
  });

  it('should throw error if current user not found', async () => {
    // @ts-ignore
    Usermodel.findById.mockReturnValueOnce({
      populate: jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnValue({
          lean: jest.fn().mockResolvedValue(null),
        }),
      }),
    });

    await expect(getOtherUsers(null, { _id: userId })).rejects.toThrow('User not found');
  });

  it('should handle users with undefined/null fields', async () => {
    mockUserFind([{
      _id: new Types.ObjectId(),
      name: 'Charlie',
      email: 'charlie@example.com',
      images: undefined,
      interests: undefined,
      likedBy: undefined,
      likedTo: undefined,
      matchIds: undefined,
    }]);

    const result = await getOtherUsers(null, { _id: userId });

    expect(result[0].images).toEqual([]);
    expect(result[0].interests).toEqual([]);
    expect(result[0].likedBy).toEqual([]);
    expect(result[0].likedTo).toEqual([]);
    expect(result[0].matchIds).toEqual([]);
  });

  it('should handle empty results', async () => {
    mockUserFind([]);
    const result = await getOtherUsers(null, { _id: userId });
    expect(result).toEqual([]);
  });

  it('should filter invalid interests and handle user data', async () => {
    const validInterest = { _id: new Types.ObjectId(), interestName: 'ValidInterest' };
    const likedUserId = new Types.ObjectId();
    const matchId = new Types.ObjectId();
    const matchUserId = new Types.ObjectId();

    mockUserFind([{
      _id: new Types.ObjectId(),
      name: 'UserWithData',
      interests: [
        null,                              // Invalid
        { interestName: 'NoId' },         // Invalid (no _id)
        { _id: '', interestName: 'Empty' }, // Invalid (falsy _id)
        validInterest                      // Valid
      ],
      likedBy: [{ _id: likedUserId }],
      likedTo: [{ _id: likedUserId }],
      matchIds: [{
        _id: matchId,
        matchedAt: new Date(),
        unmatched: false,
        startedConversation: true,
        users: [
          { _id: userId, name: 'Current User' },
          { _id: matchUserId, name: 'Matched User', images: ['match.jpg'] }
        ]
      }]
    }]);

    const result = await getOtherUsers(null, { _id: userId });

    expect(result[0].interests).toHaveLength(1);
    expect(result[0].interests[0].interestName).toBe('ValidInterest');
    expect(result[0].likedBy).toEqual([{ id: likedUserId.toString() }]);
    expect(result[0].matchIds[0].matchedUser.images).toEqual(['match.jpg']);
  });

  it('should handle match with non-array users', async () => {
    mockUserFind([{
      _id: new Types.ObjectId(),
      name: 'UserWithBadMatch',
      matchIds: [{ _id: new Types.ObjectId(), users: null }],
      likedBy: [],
      likedTo: [],
      interests: []
    }]);

    const result = await getOtherUsers(null, { _id: userId });
    expect(result[0].matchIds[0].matchedUser).toBeNull();
  });

  // Line 8 coverage: falsy user._id
  it('should handle user with falsy _id', async () => {
    mockUserFind([{
      _id: null, // Falsy _id
      name: 'UserWithNullId',
      interests: [],
      likedBy: [],
      likedTo: [],
      matchIds: []
    }]);

    const result = await getOtherUsers(null, { _id: userId });
    expect(result[0].id).toBe(''); // Should be empty string when _id is falsy
  });

  // Line 45 coverage: matchedUser with undefined images
  it('should handle matched user with undefined images', async () => {
    const matchId = new Types.ObjectId();
    const matchUserId = new Types.ObjectId();

    mockUserFind([{
      _id: new Types.ObjectId(),
      name: 'UserWithMatch',
      interests: [],
      likedBy: [],
      likedTo: [],
      matchIds: [{
        _id: matchId,
        users: [
          { _id: userId, name: 'Current User' },
          { _id: matchUserId, name: 'Matched User', images: undefined } // undefined images
        ]
      }]
    }]);

    const result = await getOtherUsers(null, { _id: userId });
    expect(result[0].matchIds[0].matchedUser.images).toEqual([]); // Should default to empty array
  });

  it('should call database methods correctly', async () => {
    mockUserFind([]);
    await getOtherUsers(null, { _id: userId });

    expect(Usermodel.findById).toHaveBeenCalledWith(userId);
    expect(MatchModel.find).toHaveBeenCalledWith({ users: userId, unmatched: false });
    expect(Usermodel.find).toHaveBeenCalledWith({ _id: { $nin: expect.any(Array) } });
  });
});