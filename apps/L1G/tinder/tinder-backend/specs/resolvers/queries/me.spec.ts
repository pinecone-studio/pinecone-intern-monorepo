/* eslint-disable max-lines */
import { getMe } from 'src/resolvers/queries/me';
import { Usermodel } from 'src/models/user';

jest.mock('src/models/user');

describe('getMe resolver', () => {
  const mockUser = {
    _id: 'someUserId',
    email: 'test@example.com',
    name: 'John Doe',
    bio: null,
    dateOfBirth: null,
    gender: null,
    genderPreferences: null,
    images: [],
    profession: null,
    schoolWork: null,
    likedBy: [],
    likedTo: [],
    matchIds: [],
    interests: [],
  };

  const buildMockQuery = (result: any) => ({
    populate: jest.fn().mockReturnThis(),
    lean: jest.fn().mockResolvedValue(result),
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('throws error if userId is missing', async () => {
    await expect(getMe({}, {}, { userId: undefined } as any)).rejects.toThrow('Not authenticated');
  });

  it('throws error if user is not found', async () => {
    jest.spyOn(Usermodel, 'findById').mockReturnValue(buildMockQuery(null) as any);
    await expect(getMe({}, {}, { userId: 'uid' } as any)).rejects.toThrow('User not found');
  });

  it('throws error if user email is missing', async () => {
    const userWithoutEmail = {
      ...mockUser,
      email: undefined,
    };

    jest.spyOn(Usermodel, 'findById').mockReturnValue(buildMockQuery(userWithoutEmail) as any);

    await expect(getMe({}, {}, { userId: 'uid' } as any)).rejects.toThrow('User email is missing');
  });

  it('returns user with default fallbacks for empty or missing fields', async () => {
    const userWithUndefinedFields = {
      ...mockUser,
      name: undefined,
      matchIds: undefined,
      likedBy: undefined,
      likedTo: undefined,
      images: undefined,
      interests: undefined,
    };

    jest.spyOn(Usermodel, 'findById').mockReturnValue(buildMockQuery(userWithUndefinedFields) as any);
    const result = await getMe({}, {}, { userId: 'uid' } as any);

    expect(result).toEqual({
      id: 'someUserId',
      email: 'test@example.com',
      name: undefined,
      bio: undefined,
      dateOfBirth: undefined,
      gender: undefined,
      genderPreferences: undefined,
      images: [],
      profession: undefined,
      schoolWork: undefined,
      likedBy: [],
      likedTo: [],
      matchIds: [],
      interests: [],
    });
  });

  it('handles user fields set as null and maps to undefined', async () => {
    const nullUser = { ...mockUser };
    jest.spyOn(Usermodel, 'findById').mockReturnValue(buildMockQuery(nullUser) as any);
    const result = await getMe({}, {}, { userId: 'uid' } as any);

    expect(result.name).toBe('John Doe');
    expect(result.bio).toBeUndefined();
    expect(result.dateOfBirth).toBeUndefined();
    expect(result.gender).toBeUndefined();
  });

  it('returns undefined for missing name field', async () => {
    const userWithoutName = {
      ...mockUser,
      name: undefined,
    };
    jest.spyOn(Usermodel, 'findById').mockReturnValue(buildMockQuery(userWithoutName) as any);
    const result = await getMe({}, {}, { userId: 'uid' } as any);
    expect(result.name).toBeUndefined();
  });

  it('maps user interests correctly', async () => {
    const userWithInterests = {
      ...mockUser,
      interests: [
        { _id: '1', interestName: 'Hiking' },
        { _id: '2', interestName: 'Cooking' },
      ],
    };

    jest.spyOn(Usermodel, 'findById').mockReturnValue(buildMockQuery(userWithInterests) as any);
    const result = await getMe({}, {}, { userId: 'someUserId' } as any);

    expect(result.interests).toEqual([
      { _id: '1', interestName: 'Hiking' },
      { _id: '2', interestName: 'Cooking' },
    ]);
  });

  it('filters out invalid interests with null _id', async () => {
    const userWithInvalidInterests = {
      ...mockUser,
      interests: [
        { _id: '1', interestName: 'Hiking' },
        { _id: null, interestName: 'Invalid Interest' },
        { _id: undefined, interestName: 'Another Invalid Interest' },
        null, // Completely null interest
      ],
    };

    jest.spyOn(Usermodel, 'findById').mockReturnValue(buildMockQuery(userWithInvalidInterests) as any);
    const result = await getMe({}, {}, { userId: 'someUserId' } as any);

    expect(result.interests).toEqual([{ _id: '1', interestName: 'Hiking' }]);
  });

  it('returns empty interests array when interests is null', async () => {
    const userWithNullInterests = {
      ...mockUser,
      interests: null,
    };

    jest.spyOn(Usermodel, 'findById').mockReturnValue(buildMockQuery(userWithNullInterests) as any);
    const result = await getMe({}, {}, { userId: 'someUserId' } as any);

    expect(result.interests).toEqual([]);
  });

  describe('match user scenarios', () => {
    const createUserWithMatch = (matchedUserProps: any) => ({
      ...mockUser,
      matchIds: [
        {
          _id: 'matchId',
          matchedAt: new Date('2022-12-12'),
          unmatched: false,
          startedConversation: false,
          users: [
            {
              _id: 'someUserId',
              email: 'test@example.com',
              name: 'John Doe',
            },
            {
              _id: 'matchedUserId',
              email: 'matched@example.com',
              ...matchedUserProps,
            },
          ],
        },
      ],
    });

    it('throws error if matched user email is missing', async () => {
      const userWithInvalidMatchedUser = createUserWithMatch({ email: undefined });
      jest.spyOn(Usermodel, 'findById').mockReturnValue(buildMockQuery(userWithInvalidMatchedUser) as any);

      await expect(getMe({}, {}, { userId: 'someUserId' } as any)).rejects.toThrow('Email is missing');
    });

    it('throws error if matched user is not found in match', async () => {
      const userWithNoMatchedUser = {
        ...mockUser,
        matchIds: [
          {
            _id: 'matchId',
            unmatched: false,
            matchedAt: new Date('2022-12-12'),
            startedConversation: false,
            users: [
              {
                _id: 'someUserId',
                email: 'test@example.com',
                name: 'John Doe',
              },
            ],
          },
        ],
      };

      jest.spyOn(Usermodel, 'findById').mockReturnValue(buildMockQuery(userWithNoMatchedUser) as any);

      await expect(getMe({}, {}, { userId: 'someUserId' } as any)).rejects.toThrow('Matched user not found');
    });

    it.each([
      [{ name: undefined }, 'name'],
      [{ name: null }, 'name'],
      [{ images: undefined }, 'images'],
      [{ images: null }, 'images'],
      [{ bio: null }, 'bio'],
      [{ profession: undefined }, 'profession'],
    ])('fallbacks for matched user: %s', async (props, field) => {
      const user = createUserWithMatch(props);
      jest.spyOn(Usermodel, 'findById').mockReturnValue(buildMockQuery(user) as any);
      const result = await getMe({}, {}, { userId: 'someUserId' } as any);

      if (field === 'images') {
        expect(result.matchIds[0].matchedUser[field]).toEqual([]);
      } else {
        expect(result.matchIds[0].matchedUser[field]).toEqual(undefined);
      }
    });

    it('maps matched user with all defined fields correctly', async () => {
      const userWithDefinedMatchedUser = createUserWithMatch({
        name: 'Defined Name',
        bio: 'Defined Bio',
        dateOfBirth: new Date('1990-01-01'),
        gender: 'male',
        genderPreferences: 'female',
        images: ['img1.jpg', 'img2.jpg'],
        profession: 'Engineer',
        schoolWork: 'University',
      });

      jest.spyOn(Usermodel, 'findById').mockReturnValue(buildMockQuery(userWithDefinedMatchedUser) as any);
      const result = await getMe({}, {}, { userId: 'someUserId' } as any);

      const matchedUser = result.matchIds[0].matchedUser;
      expect(matchedUser.name).toBe('Defined Name');
      expect(matchedUser.bio).toBe('Defined Bio');
      expect(matchedUser.gender).toBe('male');
      expect(matchedUser.genderPreferences).toBe('female');
      expect(matchedUser.images).toEqual(['img1.jpg', 'img2.jpg']);
      expect(matchedUser.profession).toBe('Engineer');
      expect(matchedUser.schoolWork).toBe('University');
    });
  });

  it('maps likedBy, likedTo, and matchIds correctly', async () => {
    const populatedUser = {
      ...mockUser,
      likedBy: [
        {
          _id: 'likedById',
          email: 'a@example.com',
          name: 'User A',
          images: [],
        },
      ],
      likedTo: [
        {
          _id: 'likedToId',
          email: 'b@example.com',
          name: 'User B',
          images: [],
        },
      ],
      matchIds: [
        {
          _id: 'matchIdMain',
          matchedAt: new Date('2022-12-12'),
          unmatched: true,
          startedConversation: false,
          users: [
            {
              _id: 'someUserId',
              email: 'test@example.com',
              name: 'John Doe',
            },
            {
              _id: 'matchedUserId',
              email: 'matched@example.com',
              name: 'Matched User',
              images: ['img1.jpg'],
            },
          ],
        },
      ],
    };
    jest.spyOn(Usermodel, 'findById').mockReturnValue(buildMockQuery(populatedUser) as any);

    const result = await getMe({}, {}, { userId: 'someUserId' } as any);

    expect(result.likedBy[0].id).toBe('likedById');
    expect(result.likedTo[0].id).toBe('likedToId');
    expect(result.matchIds[0].id).toBe('matchIdMain');
    expect(result.matchIds[0].matchedUser.id).toBe('matchedUserId');
    expect(result.matchIds[0].matchedUser.name).toBe('Matched User');
    expect(result.matchIds[0].matchedAt).toEqual(new Date('2022-12-12'));
    expect(result.matchIds[0].unmatched).toBe(true);
  });

  it('handles match with null matchedAt', async () => {
    const userWithNullMatchedAt = {
      ...mockUser,
      matchIds: [
        {
          _id: 'match1',
          matchedAt: null,
          unmatched: false,
          startedConversation: false,
          users: [
            {
              _id: 'someUserId',
              email: 'test@example.com',
              name: 'John Doe',
            },
            {
              _id: 'matchedUserId',
              email: 'matched@example.com',
              name: 'Matched User',
            },
          ],
        },
      ],
    };

    jest.spyOn(Usermodel, 'findById').mockReturnValue(buildMockQuery(userWithNullMatchedAt) as any);
    const result = await getMe({}, {}, { userId: 'someUserId' } as any);

    expect(result.matchIds[0].matchedAt).toBeNull();
  });

  it('handles match with undefined unmatched field', async () => {
    const userWithUndefinedUnmatched = {
      ...mockUser,
      matchIds: [
        {
          _id: 'match1',
          matchedAt: new Date('2022-12-12'),
          unmatched: undefined,
          startedConversation: undefined,
          users: [
            {
              _id: 'someUserId',
              email: 'test@example.com',
              name: 'John Doe',
            },
            {
              _id: 'matchedUserId',
              email: 'matched@example.com',
              name: 'Matched User',
            },
          ],
        },
      ],
    };

    jest.spyOn(Usermodel, 'findById').mockReturnValue(buildMockQuery(userWithUndefinedUnmatched) as any);
    const result = await getMe({}, {}, { userId: 'someUserId' } as any);

    expect(result.matchIds[0].unmatched).toBe(false);
    expect(result.matchIds[0].startedConversation).toBe(false);
  });

  it('returns empty matchIds array when no matches exist', async () => {
    const userWithNoMatches = {
      ...mockUser,
      matchIds: [],
    };

    jest.spyOn(Usermodel, 'findById').mockReturnValue(buildMockQuery(userWithNoMatches) as any);
    const result = await getMe({}, {}, { userId: 'someUserId' } as any);

    expect(result.matchIds).toEqual([]);
  });

  it('handles null matchIds', async () => {
    const userWithNullMatches = {
      ...mockUser,
      matchIds: null,
    };

    jest.spyOn(Usermodel, 'findById').mockReturnValue(buildMockQuery(userWithNullMatches) as any);
    const result = await getMe({}, {}, { userId: 'someUserId' } as any);

    expect(result.matchIds).toEqual([]);
  });

  it('handles multiple matches correctly', async () => {
    const userWithMultipleMatches = {
      ...mockUser,
      matchIds: [
        {
          _id: 'match1',
          matchedAt: new Date('2022-12-10'),
          unmatched: false,
          startedConversation: true,
          users: [
            {
              _id: 'someUserId',
              email: 'test@example.com',
              name: 'John Doe',
            },
            {
              _id: 'matchedUser1',
              email: 'match1@example.com',
              name: 'First Match',
            },
          ],
        },
        {
          _id: 'match2',
          matchedAt: new Date('2022-12-15'),
          unmatched: true,
          startedConversation: false,
          users: [
            {
              _id: 'someUserId',
              email: 'test@example.com',
              name: 'John Doe',
            },
            {
              _id: 'matchedUser2',
              email: 'match2@example.com',
              name: 'Second Match',
            },
          ],
        },
      ],
    };

    jest.spyOn(Usermodel, 'findById').mockReturnValue(buildMockQuery(userWithMultipleMatches) as any);
    const result = await getMe({}, {}, { userId: 'someUserId' } as any);

    expect(result.matchIds).toHaveLength(2);
    expect(result.matchIds[0].matchedUser.name).toBe('First Match');
    expect(result.matchIds[0].unmatched).toBe(false);
    expect(result.matchIds[0].startedConversation).toBe(true);
    expect(result.matchIds[1].matchedUser.name).toBe('Second Match');
    expect(result.matchIds[1].unmatched).toBe(true);
    expect(result.matchIds[1].startedConversation).toBe(false);
  });

  it('handles likedBy and likedTo arrays with multiple users', async () => {
    const userWithMultipleLikes = {
      ...mockUser,
      likedBy: [
        { _id: 'user1', email: 'user1@example.com', name: 'User 1' },
        { _id: 'user2', email: 'user2@example.com', name: 'User 2' },
      ],
      likedTo: [
        { _id: 'user3', email: 'user3@example.com', name: 'User 3' },
        { _id: 'user4', email: 'user4@example.com', name: 'User 4' },
      ],
    };

    jest.spyOn(Usermodel, 'findById').mockReturnValue(buildMockQuery(userWithMultipleLikes) as any);
    const result = await getMe({}, {}, { userId: 'someUserId' } as any);

    expect(result.likedBy).toHaveLength(2);
    expect(result.likedTo).toHaveLength(2);
    expect(result.likedBy.map((u) => u.name)).toEqual(['User 1', 'User 2']);
    expect(result.likedTo.map((u) => u.name)).toEqual(['User 3', 'User 4']);
  });

  it('handles null likedBy array', async () => {
    const userWithNullLikedBy = {
      ...mockUser,
      likedBy: null,
    };

    jest.spyOn(Usermodel, 'findById').mockReturnValue(buildMockQuery(userWithNullLikedBy) as any);
    const result = await getMe({}, {}, { userId: 'someUserId' } as any);

    expect(result.likedBy).toEqual([]);
  });

  it('handles null likedTo array', async () => {
    const userWithNullLikedTo = {
      ...mockUser,
      likedTo: null,
    };

    jest.spyOn(Usermodel, 'findById').mockReturnValue(buildMockQuery(userWithNullLikedTo) as any);
    const result = await getMe({}, {}, { userId: 'someUserId' } as any);

    expect(result.likedTo).toEqual([]);
  });

  it('throws error if likedBy user has missing email', async () => {
    const userWithInvalidLikedBy = {
      ...mockUser,
      likedBy: [{ _id: 'user1', email: undefined, name: 'User 1' }],
    };

    jest.spyOn(Usermodel, 'findById').mockReturnValue(buildMockQuery(userWithInvalidLikedBy) as any);

    await expect(getMe({}, {}, { userId: 'someUserId' } as any)).rejects.toThrow('Email is missing');
  });

  it('throws error if likedTo user has missing email', async () => {
    const userWithInvalidLikedTo = {
      ...mockUser,
      likedTo: [{ _id: 'user1', email: undefined, name: 'User 1' }],
    };

    jest.spyOn(Usermodel, 'findById').mockReturnValue(buildMockQuery(userWithInvalidLikedTo) as any);

    await expect(getMe({}, {}, { userId: 'someUserId' } as any)).rejects.toThrow('Email is missing');
  });

  it('handles database error', async () => {
    jest.spyOn(Usermodel, 'findById').mockReturnValue({
      populate: jest.fn().mockReturnThis(),
      lean: jest.fn().mockRejectedValue(new Error('Database connection failed')),
    } as any);

    await expect(getMe({}, {}, { userId: 'someUserId' } as any)).rejects.toThrow('Database connection failed');
  });
});
