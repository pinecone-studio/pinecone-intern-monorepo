import { Usermodel } from 'src/models/user';
import { MatchModel } from 'src/models/match';
import { Types } from 'mongoose';
import { getLikedByUsers } from 'src/resolvers/queries/get-likeby-users';

jest.mock('src/models/user');
jest.mock('src/models/match');

describe('getLikedByUsers', () => {
  const userId = new Types.ObjectId().toString();

  const likedUserId1 = new Types.ObjectId();
  const likedUserId2 = new Types.ObjectId();

  const likedByUsers = [
    {
      _id: likedUserId1,
      name: 'Alice',
      email: 'alice@example.com',
      images: ['img1.png'],
      profession: 'Engineer',
      dateOfBirth: '2000-01-01',
      bio: 'Hello!',
      gender: 'female',
      genderPreferences: 'male',
      interests: [{ _id: new Types.ObjectId(), interestName: 'Coding' }],
      schoolWork: 'School A',
    },
    {
      _id: likedUserId2,
      name: 'Bob',
      email: 'bob@example.com',
    },
  ];

  beforeEach(() => {
    // @ts-ignore
    Usermodel.findById.mockReturnValue({
      populate: jest.fn().mockReturnValue({
        lean: jest.fn().mockResolvedValue({
          _id: userId,
          email: 'me@example.com',
          likedBy: likedByUsers,
        }),
      }),
    });

    // @ts-ignore
    MatchModel.find.mockReturnValue({
      lean: jest.fn().mockResolvedValue([
        {
          users: [userId, likedUserId2.toString()],
          unmatched: false,
        },
      ]),
    });
  });

  it('should return likedBy users who are not already matched', async () => {
    const result = await getLikedByUsers(null, { _id: userId });

    expect(result.id).toBe(userId);
    expect(result.email).toBe('me@example.com');

    // Only Alice should be returned because Bob is already matched
    expect(result.likedBy).toHaveLength(1);
    expect(result.likedBy[0].name).toBe('Alice');
    expect(result.likedBy[0].interests).toEqual([
      {
        _id: likedByUsers[0].interests![0]._id.toString(),
        interestName: 'Coding',
      },
    ]);
  });

  it('should throw an error if user not found', async () => {
    // @ts-ignore
    Usermodel.findById.mockReturnValueOnce({
      populate: jest.fn().mockReturnValue({
        lean: jest.fn().mockResolvedValue(null),
      }),
    });

    await expect(getLikedByUsers(null, { _id: userId })).rejects.toThrow('User not found');
  });
});
