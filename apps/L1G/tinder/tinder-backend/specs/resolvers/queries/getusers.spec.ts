/* eslint-disable max-lines */
import { getusers, mapMatchedUsers } from 'src/resolvers/queries/getusers';
import { Usermodel } from 'src/models/user';
import mongoose from 'mongoose';
import { IUserLean } from 'src/types';

jest.mock('src/models/user');

interface MockUser {
  _id?: string | null;
  email: string;
  name: string;
  interests?: Array<{ _id?: string | null; interestName: string }> | null;
  images?: string[] | null;
  likedBy?: Array<{ _id: string; email: string; name: string }>;
  likedTo?: Array<{ _id: string; email: string; name: string }>;
  matchIds?: Array<{ _id: string; email: string; name: string }>;
  [key: string]: unknown;
}

function mockChain<T extends { _id?: string | mongoose.Types.ObjectId | null }>(result: T[]) {
  const mockPopulate = jest.fn().mockReturnThis();
  (Usermodel.find as jest.Mock).mockReturnValue({
    populate: mockPopulate,
    lean: jest.fn().mockResolvedValue(result),
  });
}

describe('getusers resolver', () => {
  beforeEach(() => jest.clearAllMocks());

  it('returns transformed user with likedBy', async () => {
    const users: MockUser[] = [
      {
        _id: '1',
        email: 'a@test.com',
        name: 'Alice',
        images: ['a.png'],
        likedBy: [{ _id: '2', email: 'b@test.com', name: 'Bob' }],
      },
    ];
    mockChain(users);

    const res = await getusers();
    expect(res[0].likedBy[0].email).toBe('b@test.com');
  });

  it('returns [] when no users exist', async () => {
    mockChain([]);
    const res = await getusers();
    expect(res).toEqual([]);
  });

  it('handles users with interests', async () => {
    const users: MockUser[] = [
      {
        _id: '1',
        email: 'a@test.com',
        name: 'Alice',
        interests: [{ _id: 'i1', interestName: 'Reading' }],
      },
    ];
    mockChain(users);
    const res = await getusers();
    expect(res[0].interests).toEqual([{ _id: 'i1', interestName: 'Reading' }]);
  });

  it('handles null images', async () => {
    const users: MockUser[] = [{ _id: '1', email: 'a@test.com', name: 'Alice', images: null }];
    mockChain(users);
    const res = await getusers();
    expect(res[0].images).toEqual([]);
  });

  it('handles empty or null interests', async () => {
    const cases: Array<MockUser> = [
      { _id: '1', email: 'a@test.com', name: 'Alice', interests: [] },
      { _id: '2', email: 'b@test.com', name: 'Bob', interests: null },
      { _id: '3', email: 'c@test.com', name: 'Carol', interests: undefined },
    ];

    for (const user of cases) {
      mockChain([user]);
      const res = await getusers();
      expect(res[0].interests).toBeUndefined();
    }
  });

  it('returns empty string for user id when _id is missing', async () => {
    const users: IUserLean[] = [{ _id: undefined as any, email: 'noid@test.com', name: 'NoID User' }];
    mockChain(users);

    const res = await getusers();
    expect(res[0].id).toBe('');
  });

  it('returns empty string for interest _id when _id is missing', async () => {
    const users: IUserLean[] = [
      {
        _id: '1',
        email: 'a@test.com',
        name: 'Alice',
        interests: [{ _id: undefined as any, interestName: 'Broken Interest' }],
      },
    ];
    mockChain(users);

    const res = await getusers();
    expect(res[0].interests![0]._id).toBe('');
  });

  it('transforms user with all populated fields', async () => {
    const users: MockUser[] = [
      {
        _id: '1',
        email: 'full@test.com',
        name: 'Full User',
        dateOfBirth: '1990-01-01',
        genderPreferences: 'Female',
        gender: 'Male',
        bio: 'Test bio',
        interests: [{ _id: 'i1', interestName: 'Reading' }],
        profession: 'Developer',
        schoolWork: 'University',
        images: ['img1.jpg', 'img2.jpg'],
        likedBy: [{ _id: '2', email: 'liked@test.com', name: 'Liked User' }],
        likedTo: [{ _id: '3', email: 'target@test.com', name: 'Target User' }],
        matchIds: [{ _id: '4', email: 'match@test.com', name: 'Match User' }],
      },
    ];

    mockChain(users);
    const res = await getusers();

    expect(res[0]).toMatchObject({
      id: '1',
      email: 'full@test.com',
      name: 'Full User',
      dateOfBirth: '1990-01-01',
      genderPreferences: 'Female',
      gender: 'Male',
      bio: 'Test bio',
      profession: 'Developer',
      schoolWork: 'University',
    });
    expect(res[0].interests).toEqual([{ _id: 'i1', interestName: 'Reading' }]);
    expect(res[0].images).toEqual(['img1.jpg', 'img2.jpg']);
    expect(res[0].likedBy).toHaveLength(1);
    expect(res[0].likedTo).toHaveLength(1);
    expect(res[0].matchIds).toHaveLength(1);
  });

  it('handles user with matches containing full match data', async () => {
    const users = [
      {
        _id: '1',
        email: 'user1@test.com',
        name: 'User 1',
        matchIds: [
          {
            _id: 'match1',
            matchedAt: new Date('2025-01-01'),
            unmatched: false,
            startedConversation: true,
            users: [
              { _id: '1' }, // Current user
              {
                _id: '2',
                name: 'Matched User',
                email: 'matched@test.com',
                images: ['match.jpg'],
                profession: 'Engineer',
                dateOfBirth: '1995-05-15',
                bio: 'Matched user bio',
                schoolWork: 'College',
                interests: [{ _id: 'int1', interestName: 'Gaming' }],
                gender: 'Female',
                genderPreferences: 'Male',
              },
            ],
          },
        ],
      },
    ];

    mockChain(users);
    const res = await getusers();

    expect(res[0].matchIds).toHaveLength(1);
    expect(res[0].matchIds[0]).toMatchObject({
      id: 'match1',
      unmatched: false,
      startedConversation: true,
    });
    expect(res[0].matchIds[0].matchedUser).toMatchObject({
      id: '2',
      name: 'Matched User',
      email: 'matched@test.com',
      profession: 'Engineer',
      bio: 'Matched user bio',
      schoolWork: 'College',
      gender: 'Female',
      genderPreferences: 'Male',
    });
    expect(res[0].matchIds[0].matchedUser!.interests).toEqual([{ _id: 'int1', interestName: 'Gaming' }]);
  });
  it('returns empty array when called with undefined (default param triggers)', () => {
    const result = mapMatchedUsers(undefined);
    expect(result).toEqual([]);
  });

  it('maps matched users when input is an array', () => {
    const input = [
      {
        _id: '123',
        email: 'test@test.com',
        name: 'Test User',
        dateOfBirth: '1990-01-01',
        genderPreferences: 'Any',
        gender: 'Male',
        bio: 'test bio',
        interests: [],
        profession: 'Engineer',
        schoolWork: 'MIT',
        images: [],
      },
    ];
    const result = mapMatchedUsers(input as any);
    expect(result).toHaveLength(1);
    expect(result[0].email).toBe('test@test.com');
  });
  it('returns empty array when matched is null', () => {
    const result = mapMatchedUsers(null);
    expect(result).toEqual([]);
  });
  it('returns empty array when matched is not an array', () => {
    const result = mapMatchedUsers('not-an-array' as any);
    expect(result).toEqual([]);
  });

  it('handles match with null startedConversation', async () => {
    const users = [
      {
        _id: '1',
        email: 'user1@test.com',
        name: 'User 1',
        matchIds: [
          {
            _id: 'match1',
            matchedAt: new Date('2025-01-01'),
            unmatched: false,
            startedConversation: null,
            users: [{ _id: '1' }, { _id: '2', name: 'User 2', email: 'user2@test.com' }],
          },
        ],
      },
    ];

    mockChain(users);
    const res = await getusers();

    expect(res[0].matchIds[0].startedConversation).toBe(false);
  });

  it('handles matched user with null images', async () => {
    const users = [
      {
        _id: '1',
        email: 'user1@test.com',
        name: 'User 1',
        matchIds: [
          {
            _id: 'match1',
            matchedAt: new Date('2025-01-01'),
            unmatched: false,
            users: [
              { _id: '1' },
              {
                _id: '2',
                name: 'User 2',
                email: 'user2@test.com',
                images: null,
              },
            ],
          },
        ],
      },
    ];

    mockChain(users);
    const res = await getusers();

    expect(res[0].matchIds[0].matchedUser!.images).toEqual([]);
  });

  it('handles matched user with invalid interests', async () => {
    const users = [
      {
        _id: '1',
        email: 'user1@test.com',
        name: 'User 1',
        matchIds: [
          {
            _id: 'match1',
            matchedAt: new Date('2025-01-01'),
            unmatched: false,
            users: [
              { _id: '1' },
              {
                _id: '2',
                name: 'User 2',
                email: 'user2@test.com',
                interests: [{ _id: 'valid1', interestName: 'Valid Interest' }, null, { _id: null, interestName: 'Invalid Interest' }, { _id: 'valid2', interestName: 'Another Valid' }],
              },
            ],
          },
        ],
      },
    ];

    mockChain(users);
    const res = await getusers();

    expect(res[0].matchIds[0].matchedUser!.interests).toEqual([
      { _id: 'valid1', interestName: 'Valid Interest' },
      { _id: 'valid2', interestName: 'Another Valid' },
    ]);
  });

  it('handles matched user with empty interests', async () => {
    const users = [
      {
        _id: '1',
        email: 'user1@test.com',
        name: 'User 1',
        matchIds: [
          {
            _id: 'match1',
            matchedAt: new Date('2025-01-01'),
            unmatched: false,
            users: [
              { _id: '1' },
              {
                _id: '2',
                name: 'User 2',
                email: 'user2@test.com',
                interests: [],
              },
            ],
          },
        ],
      },
    ];

    mockChain(users);
    const res = await getusers();

    expect(res[0].matchIds[0].matchedUser!.interests).toBeNull();
  });

  it('handles matched user with no interests property', async () => {
    const users = [
      {
        _id: '1',
        email: 'user1@test.com',
        name: 'User 1',
        matchIds: [
          {
            _id: 'match1',
            matchedAt: new Date('2025-01-01'),
            unmatched: false,
            users: [
              { _id: '1' },
              {
                _id: '2',
                name: 'User 2',
                email: 'user2@test.com',
              },
            ],
          },
        ],
      },
    ];

    mockChain(users);
    const res = await getusers();

    expect(res[0].matchIds[0].matchedUser!.interests).toBeNull();
  });

  it('handles match where no other user is found', async () => {
    const users = [
      {
        _id: '1',
        email: 'user1@test.com',
        name: 'User 1',
        matchIds: [
          {
            _id: 'match1',
            matchedAt: new Date('2025-01-01'),
            unmatched: false,
            users: [{ _id: '1' }],
          },
        ],
      },
    ];

    mockChain(users);
    const res = await getusers();

    expect(res[0].matchIds[0].matchedUser).toBeNull();
  });

  it('handles user with null matchIds', async () => {
    const users = [
      {
        _id: '1',
        email: 'user1@test.com',
        name: 'User 1',
        matchIds: null,
      },
    ];

    mockChain(users);
    const res = await getusers();

    expect(res[0].matchIds).toEqual([]);
  });

  it('throws error when database operation fails', async () => {
    const mockPopulate = jest.fn().mockReturnThis();
    (Usermodel.find as jest.Mock).mockReturnValue({
      populate: mockPopulate,
      lean: jest.fn().mockRejectedValue(new Error('Database error')),
    });

    await expect(getusers()).rejects.toThrow('Database error');
  });

  it('handles unknown error type', async () => {
    const mockPopulate = jest.fn().mockReturnThis();
    (Usermodel.find as jest.Mock).mockReturnValue({
      populate: mockPopulate,
      lean: jest.fn().mockRejectedValue('String error'),
    });

    await expect(getusers()).rejects.toThrow('Unknown error while fetching users');
  });
  it('returns empty array from mapMatchedUsers when input is null', () => {
    const result = mapMatchedUsers(null);
    expect(result).toEqual([]);
  });
  it('handles matched user with interests containing only invalid values', async () => {
    const users = [
      {
        _id: '1',
        email: 'user1@test.com',
        name: 'User 1',
        matchIds: [
          {
            _id: 'match1',
            matchedAt: new Date('2025-01-01'),
            unmatched: false,
            users: [
              { _id: '1' },
              {
                _id: '2',
                name: 'User 2',
                email: 'user2@test.com',
                interests: [null, { _id: null, interestName: 'Invalid' }],
              },
            ],
          },
        ],
      },
    ];

    mockChain(users);
    const res = await getusers();

    expect(res[0].matchIds[0].matchedUser!.interests).toBeNull();
  });
});
