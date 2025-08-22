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
    const mockQuery = buildMockQuery(null);
    jest.spyOn(Usermodel, 'findById').mockReturnValue(mockQuery as any);

    await expect(getMe({}, {}, { userId: 'uid' } as any)).rejects.toThrow('User not found');
  });

  it('returns user with empty arrays if no likedBy, likedTo, matchIds', async () => {
    const mockQuery = buildMockQuery(mockUser);
    jest.spyOn(Usermodel, 'findById').mockReturnValue(mockQuery as any);

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

  it('maps likedBy, likedTo, and matchIds correctly', async () => {
    const populatedUser = {
      ...mockUser,
      likedBy: [
        {
          _id: 'likedById',
          email: 'likedBy@example.com',
          name: 'Liked By User',
          bio: null,
          dateOfBirth: null,
          gender: null,
          genderPreferences: null,
          images: [],
          profession: null,
          schoolWork: null,
          matchIds: [{ _id: 'matchId1', matchedAt: new Date('2023-01-01'), unmatched: false, users: [] }],
          likedBy: [],
          likedTo: [],
        },
      ],
      likedTo: [
        {
          _id: 'likedToId',
          email: 'likedTo@example.com',
          name: 'Liked To User',
          bio: null,
          dateOfBirth: null,
          gender: null,
          genderPreferences: null,
          images: [],
          profession: null,
          schoolWork: null,
          matchIds: [],
          likedBy: [],
          likedTo: [],
        },
      ],
      matchIds: [
        {
          _id: 'matchIdMain',
          matchedAt: new Date('2022-12-12'),
          unmatched: true,
          users: [
            {
              _id: 'userInMatch',
              email: 'userInMatch@example.com',
              name: 'User In Match',
            },
          ],
        },
      ],
    };

    const mockQuery = buildMockQuery(populatedUser);
    jest.spyOn(Usermodel, 'findById').mockReturnValue(mockQuery as any);

    const result = await getMe({}, {}, { userId: 'uid' } as any);

    expect(result.likedBy.length).toBe(1);
    expect(result.likedBy[0].id).toBe('likedById');
    expect(result.likedBy[0].matchIds[0].id).toBe('matchId1');
    expect(result.likedTo.length).toBe(1);
    expect(result.likedTo[0].id).toBe('likedToId');
    expect(result.matchIds.length).toBe(1);
    expect(result.matchIds[0].id).toBe('matchIdMain');
    expect(result.matchIds[0].unmatched).toBe(true);
    expect(result.matchIds[0].users.length).toBe(1);
    expect(result.matchIds[0].users[0].id).toBe('userInMatch');
  });

  it('handles null and undefined optional fields correctly', async () => {
    const userWithNulls = {
      ...mockUser,
      name: null,
      bio: null,
      dateOfBirth: null,
      gender: null,
      genderPreferences: null,
      profession: null,
      schoolWork: null,
    };
    const mockQuery = buildMockQuery(userWithNulls);
    jest.spyOn(Usermodel, 'findById').mockReturnValue(mockQuery as any);

    const result = await getMe({}, {}, { userId: 'uid' } as any);

    expect(result.name).toBeUndefined();
    expect(result.bio).toBeUndefined();
    expect(result.dateOfBirth).toBeUndefined();
    expect(result.gender).toBeUndefined();
    expect(result.genderPreferences).toBeUndefined();
    expect(result.profession).toBeUndefined();
    expect(result.schoolWork).toBeUndefined();
  });
});
