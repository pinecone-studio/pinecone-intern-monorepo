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
  const dislikedUserId = new Types.ObjectId();

  const mockCurrentUser = {
    _id: userId,
    email: 'current@example.com',
    likedBy: [{ _id: likedByUserId, name: 'LikedBy User' }],
    likedTo: [{ _id: likedToUserId, name: 'LikedTo User' }],
    dislikedTo: [{ _id: dislikedUserId, name: 'Disliked User' }],
  };

 const mockUserFind = (users: any[]) => {
  // @ts-ignore
  Usermodel.find.mockReturnValueOnce({
    populate: jest.fn().mockReturnValue({
      populate: jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnValue({
          populate: jest.fn().mockReturnValue({
            populate: jest.fn().mockReturnValue({
              lean: jest.fn().mockResolvedValue(users),
            }),
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
          populate: jest.fn().mockReturnValue({
            lean: jest.fn().mockResolvedValue(mockCurrentUser),
          }),
        }),
      }),
    });

    // @ts-ignore
    MatchModel.find.mockReturnValue({
      lean: jest.fn().mockResolvedValue([{ 
        users: [userId, matchedUserId.toString()], 
        unmatched: false 
      }]),
    });
  });

  it('should return users excluding current user, liked users, disliked users, and matched users', async () => {
    const otherUserId1 = new Types.ObjectId();
    mockUserFind([
      {
        _id: otherUserId1,
        name: 'Alice',
        email: 'alice@example.com',
        dateOfBirth: new Date(),
        gender: 'female',
        genderPreferences: 'male',
        bio: 'Test bio',
        profession: 'Developer',
        schoolWork: 'University',
        images: ['img1.png'],
        interests: [{ _id: new Types.ObjectId(), interestName: 'Coding' }],
        likedBy: [],
        likedTo: [],
        dislikedTo: [],
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
          populate: jest.fn().mockReturnValue({
            lean: jest.fn().mockResolvedValue(null),
          }),
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
    dateOfBirth: null,
    gender: null,
    genderPreferences: null,
    bio: null,
    profession: null,
    schoolWork: null,
    images: undefined,
    interests: undefined,
    likedBy: undefined,
    likedTo: undefined,
    dislikedTo: undefined, // This is the uncovered line
    matchIds: undefined,
  }]);

  const result = await getOtherUsers(null, { _id: userId });

  expect(result[0].images).toEqual([]);
  expect(result[0].interests).toEqual([]);
  expect(result[0].likedBy).toEqual([]);
  expect(result[0].likedTo).toEqual([]);
  expect(result[0].dislikedTo).toEqual([]); // Add this assertion
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
      email: 'test@example.com',
      dateOfBirth: new Date(),
      gender: 'male',
      genderPreferences: 'female',
      bio: 'Test bio',
      profession: 'Developer',
      schoolWork: 'School',
      images: ['test.jpg'],
      interests: [
        null,                              // Invalid
        { interestName: 'NoId' },         // Invalid (no _id)
        { _id: '', interestName: 'Empty' }, // Invalid (falsy _id)
        validInterest                      // Valid
      ],
      likedBy: [{ _id: likedUserId }],
      likedTo: [{ _id: likedUserId }],
      dislikedTo: [],
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
      email: 'test@example.com',
      dateOfBirth: new Date(),
      gender: 'male',
      genderPreferences: 'female',
      bio: 'Test bio',
      profession: 'Developer',
      schoolWork: 'School',
      images: ['test.jpg'],
      interests: [],
      likedBy: [],
      likedTo: [],
      dislikedTo: [],
      matchIds: [{ _id: new Types.ObjectId(), users: null }],
    }]);

    const result = await getOtherUsers(null, { _id: userId });
    expect(result[0].matchIds[0].matchedUser).toBeNull();
  });

  it('should handle user with falsy _id', async () => {
    mockUserFind([{
      _id: null, // Falsy _id
      name: 'UserWithNullId',
      email: 'test@example.com',
      dateOfBirth: new Date(),
      gender: 'male',
      genderPreferences: 'female',
      bio: 'Test bio',
      profession: 'Developer',
      schoolWork: 'School',
      images: ['test.jpg'],
      interests: [],
      likedBy: [],
      likedTo: [],
      dislikedTo: [],
      matchIds: []
    }]);

    const result = await getOtherUsers(null, { _id: userId });
    expect(result[0].id).toBe(''); // Should be empty string when _id is falsy
  });

  it('should handle matched user with undefined images', async () => {
    const matchId = new Types.ObjectId();
    const matchUserId = new Types.ObjectId();

    mockUserFind([{
      _id: new Types.ObjectId(),
      name: 'UserWithMatch',
      email: 'test@example.com',
      dateOfBirth: new Date(),
      gender: 'male',
      genderPreferences: 'female',
      bio: 'Test bio',
      profession: 'Developer',
      schoolWork: 'School',
      images: ['test.jpg'],
      interests: [],
      likedBy: [],
      likedTo: [],
      dislikedTo: [],
      matchIds: [{
        _id: matchId,
        matchedAt: new Date(),
        unmatched: false,
        startedConversation: false,
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
  it('should handle empty dislikedTo array', async () => {
  mockUserFind([{
    _id: new Types.ObjectId(),
    name: 'Test User',
    email: 'test@example.com',
    dateOfBirth: new Date(),
    gender: 'male',
    genderPreferences: 'female',
    bio: 'Test bio',
    profession: 'Developer',
    schoolWork: 'School',
    images: [],
    interests: [],
    likedBy: [],
    likedTo: [],
    dislikedTo: [], // Empty array
    matchIds: []
  }]);

  const result = await getOtherUsers(null, { _id: userId });
  
  expect(result[0].dislikedTo).toEqual([]);
});
it('should transform dislikedTo field correctly', async () => {
  const dislikedUserId = new Types.ObjectId();
  
  mockUserFind([{
    _id: new Types.ObjectId(),
    name: 'Test User',
    email: 'test@example.com',
    dateOfBirth: new Date(),
    gender: 'male',
    genderPreferences: 'female',
    bio: 'Test bio',
    profession: 'Developer',
    schoolWork: 'School',
    images: [],
    interests: [],
    likedBy: [],
    likedTo: [],
    dislikedTo: [{ _id: dislikedUserId, name: 'Disliked User' }], // Has disliked users
    matchIds: []
  }]);

  const result = await getOtherUsers(null, { _id: userId });
  
  expect(result[0].dislikedTo).toEqual([{ id: dislikedUserId.toString() }]);
});
it('should handle current user with undefined dislikedTo', async () => {
  // Mock current user with undefined dislikedTo
  // @ts-ignore
  Usermodel.findById.mockReturnValueOnce({
    populate: jest.fn().mockReturnValue({
      populate: jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnValue({
          lean: jest.fn().mockResolvedValue({
            _id: userId,
            email: 'current@example.com',
            likedBy: [],
            likedTo: [],
            dislikedTo: undefined, // This will trigger the || [] fallback
          }),
        }),
      }),
    }),
  });

  mockUserFind([{
    _id: new Types.ObjectId(),
    name: 'Test User',
    email: 'test@example.com',
    dateOfBirth: new Date(),
    gender: 'male',
    genderPreferences: 'female',
    bio: 'Test bio',
    profession: 'Developer',
    schoolWork: 'School',
    images: [],
    interests: [],
    likedBy: [],
    likedTo: [],
    dislikedTo: [],
    matchIds: []
  }]);

  const result = await getOtherUsers(null, { _id: userId });
  
  expect(result).toHaveLength(1);
  expect(result[0].name).toBe('Test User');
});

it('should handle current user with null dislikedTo', async () => {
  // @ts-ignore
  Usermodel.findById.mockReturnValueOnce({
    populate: jest.fn().mockReturnValue({
      populate: jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnValue({
          lean: jest.fn().mockResolvedValue({
            _id: userId,
            email: 'current@example.com',
            likedBy: [],
            likedTo: [],
            dislikedTo: null, // This will also trigger the || [] fallback
          }),
        }),
      }),
    }),
  });

  mockUserFind([{
    _id: new Types.ObjectId(),
    name: 'Another Test User',
    email: 'another@example.com',
    dateOfBirth: new Date(),
    gender: 'female',
    genderPreferences: 'male',
    bio: 'Another bio',
    profession: 'Designer',
    schoolWork: 'College',
    images: [],
    interests: [],
    likedBy: [],
    likedTo: [],
    dislikedTo: [],
    matchIds: []
  }]);

  const result = await getOtherUsers(null, { _id: userId });
  
  expect(result).toHaveLength(1);
  expect(result[0].name).toBe('Another Test User');
});
});