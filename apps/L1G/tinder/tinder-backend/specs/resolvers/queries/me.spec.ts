/* eslint-disable max-lines */
import { getMe } from 'src/resolvers/queries/me';
import { Usermodel } from 'src/models/user';

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

  it('returns user with default fallbacks for empty or missing fields', async () => {
    const userWithUndefinedFields = {
      ...mockUser,
      matchIds: undefined,
      likedBy: undefined,
      likedTo: undefined,
      images: undefined,
    };

    jest.spyOn(Usermodel, 'findById').mockReturnValue(buildMockQuery(userWithUndefinedFields) as any);
    const result = await getMe({}, {}, { userId: 'uid' } as any);

    expect(result).toEqual({
      id: 'someUserId',
      email: 'test@example.com',
      name: 'John Doe',
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
    });
  });

  describe.each([
    [{ matchedAt: null }, 'matchedAt is null'],
    [
      {
        /* no matchedAt */
      },
      'matchedAt is undefined',
    ],
  ])('matchIds with %s', (match, desc) => {
    it(`sets matchedAt to undefined when ${desc}`, async () => {
      const user = { ...mockUser, matchIds: [{ _id: 'm', unmatched: false, users: [], ...match }] };
      jest.spyOn(Usermodel, 'findById').mockReturnValue(buildMockQuery(user) as any);
      const result = await getMe({}, {}, { userId: 'uid' } as any);
      expect(result.matchIds[0].matchedAt).toBeUndefined();
    });
  });

  it('handles user fields set as null and maps to undefined', async () => {
    const nullUser = { ...mockUser };
    jest.spyOn(Usermodel, 'findById').mockReturnValue(buildMockQuery(nullUser) as any);
    const result = await getMe({}, {}, { userId: 'uid' } as any);
    expect(result.name);
    expect(result.bio).toBeUndefined();
    expect(result.dateOfBirth).toBeUndefined();
    expect(result.gender).toBeUndefined();
  });
  it('throws error if user email is missing', async () => {
    const userWithoutEmail = {
      ...mockUser,
      email: undefined,
    };

    jest.spyOn(Usermodel, 'findById').mockReturnValue(buildMockQuery(userWithoutEmail) as any);

    await expect(getMe({}, {}, { userId: 'uid' } as any)).rejects.toThrow('User email is missing');
  });
  it('throws error if nested user email is missing inside match', async () => {
    const userWithInvalidNestedUser = {
      ...mockUser,
      matchIds: [
        {
          _id: 'matchId',
          unmatched: false,
          users: [
            {
              _id: 'nestedUser',
              email: undefined,
              name: 'Nested User',
              images: [],
              matchIds: [],
              likedBy: [],
              likedTo: [],
            },
          ],
        },
      ],
    };

    jest.spyOn(Usermodel, 'findById').mockReturnValue(buildMockQuery(userWithInvalidNestedUser) as any);

    await expect(getMe({}, {}, { userId: 'uid' } as any)).rejects.toThrow('Email is missing');
  });

  describe('match user fallbacks', () => {
    const userWithMatchUser = (userProps: any) => ({
      ...mockUser,
      matchIds: [{ _id: 'matchId', users: [{ _id: 'u', email: 'u@example.com', ...userProps }] }],
    });

    it.each([
      [{ name: undefined }, 'name', null],
      [{ images: undefined }, 'images', []],
      [{ matchIds: undefined }, 'matchIds', []],
    ])('fallbacks for nested user: %s', async (props, field, expected) => {
      const user = userWithMatchUser(props);
      jest.spyOn(Usermodel, 'findById').mockReturnValue(buildMockQuery(user) as any);
      const result = await getMe({}, {}, { userId: 'uid' } as any);
      expect(result.matchIds[0].users[0][field]).toEqual(expected);
    });

    it('returns empty users array if users is empty', async () => {
      const user = { ...mockUser, matchIds: [{ _id: 'matchId', users: [] }] };
      jest.spyOn(Usermodel, 'findById').mockReturnValue(buildMockQuery(user) as any);
      const result = await getMe({}, {}, { userId: 'uid' } as any);
      expect(result.matchIds[0].users).toEqual([]);
    });
  });

  it('maps likedBy, likedTo, and matchIds correctly', async () => {
    const populatedUser = {
      ...mockUser,
      likedBy: [{ _id: 'likedById', email: 'a', name: 'A', images: [], matchIds: [], likedBy: [], likedTo: [] }],
      likedTo: [{ _id: 'likedToId', email: 'b', name: 'B', images: [], matchIds: [], likedBy: [], likedTo: [] }],
      matchIds: [
        {
          _id: 'matchIdMain',
          matchedAt: new Date('2022-12-12'),
          unmatched: true,
          users: [{ _id: 'userInMatch', email: 'user@example.com', name: 'User In Match' }],
        },
      ],
    };
    jest.spyOn(Usermodel, 'findById').mockReturnValue(buildMockQuery(populatedUser) as any);

    const result = await getMe({}, {}, { userId: 'uid' } as any);

    expect(result.likedBy[0].id).toBe('likedById');
    expect(result.likedTo[0].id).toBe('likedToId');
    expect(result.matchIds[0].id).toBe('matchIdMain');
    expect(result.matchIds[0].users[0].id).toBe('userInMatch');
  });
  it('covers defined nested user.name, images, and matchIds', async () => {
    const userWithDefinedFields = {
      ...mockUser,
      matchIds: [
        {
          _id: 'definedMatch',
          matchedAt: new Date(),
          unmatched: false,
          users: [
            {
              _id: 'definedUser',
              email: 'defined@example.com',
              name: 'Defined Name',
              images: ['img1.jpg'],
              matchIds: [
                {
                  _id: 'nestedMatch',
                  matchedAt: new Date(),
                  unmatched: false,
                  users: [],
                },
              ],
              likedBy: [],
              likedTo: [],
            },
          ],
        },
      ],
    };

    const mockQuery = buildMockQuery(userWithDefinedFields);
    jest.spyOn(Usermodel, 'findById').mockReturnValue(mockQuery as any);

    const result = await getMe({}, {}, { userId: 'uid' } as any);

    const nestedUser = result.matchIds[0].users[0];
    expect(nestedUser.name).toBe('Defined Name');
    expect(nestedUser.images).toEqual(['img1.jpg']);
    expect(nestedUser.matchIds.length).toBe(1);
  });
  it('handles match with undefined users array', async () => {
    const userWithUndefinedMatchUsers = {
      ...mockUser,
      matchIds: [
        {
          _id: 'match1',
          matchedAt: new Date(),
          unmatched: false,
          users: undefined,
        },
      ],
    };

    jest.spyOn(Usermodel, 'findById').mockReturnValue(buildMockQuery(userWithUndefinedMatchUsers) as any);
    const result = await getMe({}, {}, { userId: 'uid' } as any);

    expect(result.matchIds[0].users).toEqual([]);
  });

  it('maps nested users inside matchIds correctly', async () => {
    const userWithNestedMatchUsers = {
      ...mockUser,
      matchIds: [
        {
          _id: 'match2',
          matchedAt: new Date(),
          unmatched: false,
          users: [
            {
              _id: 'nestedUser1',
              email: 'nested@example.com',
              name: null,
              images: undefined,
              matchIds: undefined,
              likedBy: [],
              likedTo: [],
            },
          ],
        },
      ],
    };

    jest.spyOn(Usermodel, 'findById').mockReturnValue(buildMockQuery(userWithNestedMatchUsers) as any);
    const result = await getMe({}, {}, { userId: 'uid' } as any);

    const nestedUser = result.matchIds[0].users[0];
    expect(nestedUser.name).toBeNull();
    expect(nestedUser.images).toEqual([]);
    expect(nestedUser.matchIds).toEqual([]);
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
});
