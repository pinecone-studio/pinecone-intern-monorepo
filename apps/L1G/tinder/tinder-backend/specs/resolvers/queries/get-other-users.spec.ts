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
  const otherUserId1 = new Types.ObjectId();
  const otherUserId2 = new Types.ObjectId();

  beforeEach(() => {
    jest.clearAllMocks();

    // @ts-ignore
    Usermodel.findById.mockReturnValue({
      populate: jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnValue({
          lean: jest.fn().mockResolvedValue({
            _id: userId,
            email: 'current@example.com',
            likedBy: [{ _id: likedByUserId, name: 'LikedBy User' }],
            likedTo: [{ _id: likedToUserId, name: 'LikedTo User' }],
          }),
        }),
      }),
    });

    // @ts-ignore
    MatchModel.find.mockReturnValue({
      lean: jest.fn().mockResolvedValue([{ users: [userId, matchedUserId.toString()], unmatched: false }]),
    });

    // @ts-ignore
    Usermodel.find.mockReturnValue({
      select: jest.fn().mockReturnValue({
        lean: jest.fn().mockResolvedValue([
          {
            _id: otherUserId1,
            name: 'Alice',
            email: 'alice@example.com',
            images: ['img1.png'],
            profession: 'Engineer',
            dateOfBirth: '2000-01-01',
            bio: 'Hello!',
            gender: 'female',
            genderPreferences: 'male',
            interests: [{ _id: new Types.ObjectId(), interestName: 'Coding' }],
            schoolWork: 'MIT',
          },
          {
            _id: otherUserId2,
            name: 'Bob',
            email: 'bob@example.com',
            images: [],
            profession: 'Designer',
            interests: [],
            schoolWork: 'Art School',
          },
        ]),
      }),
    });
  });

  it('should return users excluding current user, liked users, and matched users', async () => {
    const result = await getOtherUsers(null, { _id: userId });

    expect(result).toHaveLength(2);
    expect(result[0].id).toBe(otherUserId1.toString());
    expect(result[0].name).toBe('Alice');
    expect(result[0].email).toBe('alice@example.com');
    expect(result[0].interests[0].interestName).toBe('Coding');
    expect(result[1].name).toBe('Bob');
    expect(result[1].interests).toEqual([]);
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

  it('should handle users with undefined/null fields correctly', async () => {
    // @ts-ignore
    Usermodel.find.mockReturnValueOnce({
      select: jest.fn().mockReturnValue({
        lean: jest.fn().mockResolvedValue([
          {
            _id: new Types.ObjectId(),
            name: 'Charlie',
            email: 'charlie@example.com',
            images: undefined,
            profession: undefined,
            interests: undefined,
          },
        ]),
      }),
    });

    const result = await getOtherUsers(null, { _id: userId });

    expect(result).toHaveLength(1);
    expect(result[0].images).toEqual([]);
    expect(result[0].profession).toBeUndefined();
    expect(result[0].interests).toEqual([]);
  });

  it('should handle users with empty interests array', async () => {
    // @ts-ignore
    Usermodel.find.mockReturnValueOnce({
      select: jest.fn().mockReturnValue({
        lean: jest.fn().mockResolvedValue([
          {
            _id: new Types.ObjectId(),
            name: 'David',
            email: 'david@example.com',
            interests: [],
          },
        ]),
      }),
    });

    const result = await getOtherUsers(null, { _id: userId });

    expect(result[0].interests).toEqual([]);
  });

  it('should handle case when no other users exist', async () => {
    // @ts-ignore
    Usermodel.find.mockReturnValueOnce({
      select: jest.fn().mockReturnValue({
        lean: jest.fn().mockResolvedValue([]),
      }),
    });

    const result = await getOtherUsers(null, { _id: userId });

    expect(result).toEqual([]);
  });

  it('should properly format ObjectId to string for interests', async () => {
    const interestId = new Types.ObjectId();
    // @ts-ignore
    Usermodel.find.mockReturnValueOnce({
      select: jest.fn().mockReturnValue({
        lean: jest.fn().mockResolvedValue([
          {
            _id: new Types.ObjectId(),
            name: 'Interest User',
            interests: [{ _id: interestId, interestName: 'Testing' }],
          },
        ]),
      }),
    });

    const result = await getOtherUsers(null, { _id: userId });

    expect(result[0].interests[0]._id).toBe(interestId.toString());
    expect(result[0].interests[0].interestName).toBe('Testing');
  });

  it('should call database methods with correct parameters', async () => {
    await getOtherUsers(null, { _id: userId });

    expect(Usermodel.findById).toHaveBeenCalledWith(userId);
    expect(MatchModel.find).toHaveBeenCalledWith({ users: userId, unmatched: false });
    expect(Usermodel.find).toHaveBeenCalledWith({ _id: { $nin: expect.any(Array) } });
  });
});
