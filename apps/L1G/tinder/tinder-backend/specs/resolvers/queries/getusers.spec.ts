import { getusers, mapSimpleUser, mapLikedByUsers, mapLikedToUsers, mapMatchedUsers } from 'src/resolvers/queries/getusers';
import { Usermodel } from 'src/models/user';

jest.mock('src/models/user');

describe('getusers resolver', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return transformed users with likedBy, likedTo, and matchIds', async () => {
    const mockUsers = [
      {
        _id: '1',
        email: 'alice@example.com',
        name: 'Alice',
        images: ['a.png'],
        likedBy: [{ _id: '2', email: 'bob@example.com', name: 'Bob' }],
        likedTo: [],
        matchIds: [],
      },
    ];

    (Usermodel.find as jest.Mock).mockReturnValue({
      populate: jest.fn().mockReturnThis(),
      lean: jest.fn().mockResolvedValue(mockUsers),
    });

    const result = await getusers();

    expect(result).toEqual([
      {
        id: '1',
        email: 'alice@example.com',
        name: 'Alice',
        dateOfBirth: undefined,
        genderPreferences: undefined,
        gender: undefined,
        bio: undefined,
        interests: undefined,
        profession: undefined,
        schoolWork: undefined,
        images: ['a.png'],
        likedBy: [
          {
            id: '2',
            email: 'bob@example.com',
            name: 'Bob',
            dateOfBirth: undefined,
            genderPreferences: undefined,
            gender: undefined,
            bio: undefined,
            interests: undefined,
            profession: undefined,
            schoolWork: undefined,
            images: [],
            likedBy: [],
            likedTo: [],
            matchIds: [],
          },
        ],
        likedTo: [],
        matchIds: [],
      },
    ]);
  });

  it('should return empty array when no users exist', async () => {
    (Usermodel.find as jest.Mock).mockReturnValue({
      populate: jest.fn().mockReturnThis(),
      lean: jest.fn().mockResolvedValue([]),
    });

    const result = await getusers();
    expect(result).toEqual([]);
  });

  it('should throw error when query fails', async () => {
    (Usermodel.find as jest.Mock).mockReturnValue({
      populate: jest.fn().mockReturnThis(),
      lean: jest.fn().mockRejectedValue(new Error('DB error')),
    });

    await expect(getusers()).rejects.toThrow('DB error');
  });
});

describe('Mapping helpers', () => {
  const sampleUser = { _id: 'x', email: 'u@test.com', name: 'Test' };

  it('mapSimpleUser should transform user correctly', () => {
    expect(mapSimpleUser(sampleUser as any)).toEqual({
      id: 'x',
      email: 'u@test.com',
      name: 'Test',
      dateOfBirth: undefined,
      genderPreferences: undefined,
      gender: undefined,
      bio: undefined,
      interests: undefined,
      profession: undefined,
      schoolWork: undefined,
      images: [],
      likedBy: [],
      likedTo: [],
      matchIds: [],
    });
  });

  it('mapLikedByUsers should return [] when null/undefined', () => {
    expect(mapLikedByUsers(null)).toEqual([]);
    expect(mapLikedByUsers(undefined as any)).toEqual([]);
  });

  it('mapLikedToUsers should return [] when null/undefined', () => {
    expect(mapLikedToUsers(null)).toEqual([]);
    expect(mapLikedToUsers(undefined as any)).toEqual([]);
  });

  it('mapMatchedUsers should return [] when null/undefined', () => {
    expect(mapMatchedUsers(null)).toEqual([]);
    expect(mapMatchedUsers(undefined as any)).toEqual([]);
  });

  it('mapLikedByUsers should map array properly', () => {
    expect(mapLikedByUsers([sampleUser as any])).toEqual([mapSimpleUser(sampleUser as any)]);
  });

  it('mapLikedToUsers should map array properly', () => {
    expect(mapLikedToUsers([sampleUser as any])).toEqual([mapSimpleUser(sampleUser as any)]);
  });

  it('mapMatchedUsers should map array properly', () => {
    expect(mapMatchedUsers([sampleUser as any])).toEqual([mapSimpleUser(sampleUser as any)]);
  });
});