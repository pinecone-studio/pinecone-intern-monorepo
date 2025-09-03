/* eslint max-lines: "off" */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
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
      images: [],
      profession: '',
      dateOfBirth: '',
      bio: '',
      gender: '',
      genderPreferences: '',
      interests: [],
      schoolWork: '',
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
  // Add these test cases to your existing test file

  it('should handle users with undefined/null fields correctly', async () => {
    const userWithNullFields = {
      _id: new Types.ObjectId(),
      name: 'Charlie',
      email: 'charlie@example.com',
      images: undefined, // This will test the ?? [] fallback
      profession: undefined,
      dateOfBirth: undefined,
      bio: undefined,
      gender: undefined,
      genderPreferences: undefined,
      interests: undefined, // This will test the interests?.length condition
      schoolWork: undefined,
    };

    // @ts-ignore
    Usermodel.findById.mockReturnValueOnce({
      populate: jest.fn().mockReturnValue({
        lean: jest.fn().mockResolvedValue({
          _id: userId,
          email: 'me@example.com',
          likedBy: [userWithNullFields],
        }),
      }),
    });

    // No matches for this test
    // @ts-ignore
    MatchModel.find.mockReturnValueOnce({
      lean: jest.fn().mockResolvedValue([]),
    });

    const result = await getLikedByUsers(null, { _id: userId });

    expect(result.likedBy).toHaveLength(1);
    const user = result.likedBy[0];

    // Test the uncovered mapping lines
    expect(user.images).toEqual([]); // images: u.images ?? []
    expect(user.profession).toBeUndefined(); // profession: u.profession
    expect(user.dateOfBirth).toBeUndefined(); // dateOfBirth: u.dateOfBirth
    expect(user.bio).toBeUndefined(); // bio: u.bio
    expect(user.gender).toBeUndefined(); // gender: u.gender
    expect(user.genderPreferences).toBeUndefined(); // genderPreferences: u.genderPreferences
    expect(user.interests).toEqual([]); // interests: u.interests?.length ? ... : []
    expect(user.schoolWork).toBeUndefined(); // schoolWork: u.schoolWork
  });

  it('should handle users with empty interests array', async () => {
    const userWithEmptyInterests = {
      _id: new Types.ObjectId(),
      name: 'David',
      email: 'david@example.com',
      images: ['img1.jpg'],
      profession: 'Designer',
      dateOfBirth: '1995-05-05',
      bio: 'Creative person',
      gender: 'non-binary',
      genderPreferences: 'any',
      interests: [], // Empty array - this will test the interests?.length condition
      schoolWork: 'Art School',
    };

    // @ts-ignore
    Usermodel.findById.mockReturnValueOnce({
      populate: jest.fn().mockReturnValue({
        lean: jest.fn().mockResolvedValue({
          _id: userId,
          email: 'me@example.com',
          likedBy: [userWithEmptyInterests],
        }),
      }),
    });

    // @ts-ignore
    MatchModel.find.mockReturnValueOnce({
      lean: jest.fn().mockResolvedValue([]),
    });

    const result = await getLikedByUsers(null, { _id: userId });

    expect(result.likedBy).toHaveLength(1);
    const user = result.likedBy[0];

    expect(user.interests).toEqual([]); // Tests the empty interests array case
    expect(user.images).toEqual(['img1.jpg']);
    expect(user.profession).toBe('Designer');
    expect(user.bio).toBe('Creative person');
  });

  it('should handle user with null email', async () => {
    // @ts-ignore
    Usermodel.findById.mockReturnValueOnce({
      populate: jest.fn().mockReturnValue({
        lean: jest.fn().mockResolvedValue({
          _id: userId,
          email: null, // This will test the email ?? '' fallback
          likedBy: [],
        }),
      }),
    });

    // @ts-ignore
    MatchModel.find.mockReturnValueOnce({
      lean: jest.fn().mockResolvedValue([]),
    });

    const result = await getLikedByUsers(null, { _id: userId });

    expect(result.email).toBe(''); // Tests email: userObj.email ?? ''
  });
});
