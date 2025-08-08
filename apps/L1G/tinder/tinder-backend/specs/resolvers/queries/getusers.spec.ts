/* eslint-disable no-console, max-lines */

import { getusers, mapLikedByUsers, mapLikedToUsers, mapSimpleUser, mapMatchedUsers } from 'src/resolvers/queries/getusers';
import { Usermodel } from 'src/models/user';

jest.mock('src/models/user');

describe('getusers resolver', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  function createPopulateChain(mockData: any) {
    const leanMock = jest.fn().mockResolvedValueOnce(mockData);
    const populate3 = jest.fn().mockReturnValueOnce({ lean: leanMock });
    const populate2 = jest.fn().mockReturnValueOnce({ populate: populate3 });
    const populate1 = jest.fn().mockReturnValueOnce({ populate: populate2 });
    return {
      leanMock,
      populate1,
      populate2,
      populate3,
    };
  }

  it('should return transformed users with likedBy and likedTo arrays', async () => {
    const mockUsers = [
      {
        _id: '60f1a5e9c9d8e72e5c9b1234',
        email: 'alice@example.com',
        name: 'Alice',
        likedBy: [
          {
            _id: '60f1a5e9c9d8e72e5c9b5678',
            email: 'bob@example.com',
            name: 'Bob',
            likedBy: [],
            likedTo: [],
          },
        ],
        likedTo: [],
      },
    ];

    const { populate1 } = createPopulateChain(mockUsers);

    jest.spyOn(Usermodel, 'find').mockReturnValue({
      populate: populate1,
    } as any);

    const result = await getusers();

    expect(result).toEqual([
      {
        id: '60f1a5e9c9d8e72e5c9b1234',
        email: 'alice@example.com',
        name: 'Alice',
        likedBy: [
          {
            id: '60f1a5e9c9d8e72e5c9b5678',
            email: 'bob@example.com',
            name: 'Bob',
            likedBy: [],
            likedTo: [],
            matched: [],
          },
        ],
        likedTo: [],
        matched: [],
        images: [],
      },
    ]);
  });

  it('should call find().lean() even if populate is not chained', async () => {
    const mockUsers = [
      {
        _id: '123',
        email: 'user@example.com',
        name: 'User',
        likedBy: [],
        likedTo: [],
      },
    ];

    const leanMock = jest.fn().mockResolvedValueOnce(mockUsers);
    const populate3 = jest.fn().mockReturnValue({ lean: leanMock });
    const populate2 = jest.fn().mockReturnValue({ populate: populate3 });
    const populate1 = jest.fn().mockReturnValue({ populate: populate2 });

    jest.spyOn(Usermodel, 'find').mockReturnValue({ populate: populate1 } as any);

    const result = await getusers();

    expect(result).toEqual([
      {
        id: '123',
        email: 'user@example.com',
        name: 'User',
        likedBy: [],
        likedTo: [],
        matched: [],
        images: [],
      },
    ]);
  });

  it('should return empty array when no users found', async () => {
    const mockUsers: any[] = [];

    const { populate1 } = createPopulateChain(mockUsers);

    jest.spyOn(Usermodel, 'find').mockReturnValue({
      populate: populate1,
    } as any);

    const result = await getusers();

    expect(result).toEqual([]);
  });

  it('maps likedBy and likedTo when they have values', async () => {
    const mockUsers = [
      {
        _id: '1',
        email: 'main@example.com',
        name: 'Main',
        likedBy: [{ _id: '2', email: 'by@example.com', name: 'By' }],
        likedTo: [{ _id: '3', email: 'to@example.com', name: 'To' }],
      },
    ];

    const { populate1 } = createPopulateChain(mockUsers);

    jest.spyOn(Usermodel, 'find').mockReturnValue({
      populate: populate1,
    } as any);

    const result = await getusers();

    expect(result).toEqual([
      {
        id: '1',
        email: 'main@example.com',
        name: 'Main',
        likedBy: [
          {
            id: '2',
            email: 'by@example.com',
            name: 'By',
            likedBy: [],
            likedTo: [],
            matched: [],
          },
        ],
        likedTo: [
          {
            id: '3',
            email: 'to@example.com',
            name: 'To',
            likedBy: [],
            likedTo: [],
            matched: [],
          },
        ],
        matched: [],
        images: [],
      },
    ]);
  });

  it('should map images and matched users correctly', async () => {
    const mockUsers = [
      {
        _id: '60f1a5e9c9d8e72e5c9b1234',
        email: 'alice@example.com',
        name: 'Alice',
        images: ['img1.jpg', 'img2.jpg'],
        likedBy: [],
        likedTo: [],
        matched: [
          {
            _id: '60f1a5e9c9d8e72e5c9b5678',
            email: 'bob@example.com',
            name: 'Bob',
          },
        ],
      },
    ];

    const { populate1 } = createPopulateChain(mockUsers);

    jest.spyOn(Usermodel, 'find').mockReturnValue({
      populate: populate1,
    } as any);

    const result = await getusers();

    expect(result).toEqual([
      {
        id: '60f1a5e9c9d8e72e5c9b1234',
        email: 'alice@example.com',
        name: 'Alice',
        images: ['img1.jpg', 'img2.jpg'],
        matched: [
          {
            id: '60f1a5e9c9d8e72e5c9b5678',
            email: 'bob@example.com',
            name: 'Bob',
            likedBy: [],
            likedTo: [],
            matched: [],
          },
        ],
        likedBy: [],
        likedTo: [],
      },
    ]);
  });

  it('should handle empty images and matched gracefully', async () => {
    const mockUsers = [
      {
        _id: '70f1a5e9c9d8e72e5c9b9999',
        email: 'carol@example.com',
        name: 'Carol',
        images: null,
        likedBy: [],
        likedTo: [],
        matched: null,
      },
    ];

    const { populate1 } = createPopulateChain(mockUsers);

    jest.spyOn(Usermodel, 'find').mockReturnValue({
      populate: populate1,
    } as any);

    const result = await getusers();

    expect(result).toEqual([
      {
        id: '70f1a5e9c9d8e72e5c9b9999',
        email: 'carol@example.com',
        name: 'Carol',
        images: [],
        matched: [],
        likedBy: [],
        likedTo: [],
      },
    ]);
  });

  it('handles null and undefined likedBy and likedTo without errors', async () => {
    const mockUsers = [
      {
        _id: 'abc123',
        email: 'nulls@example.com',
        name: 'Null User',
        images: null,
        likedBy: null,
        likedTo: undefined,
        matched: null,
      },
    ];

    const { populate1 } = createPopulateChain(mockUsers);

    jest.spyOn(Usermodel, 'find').mockReturnValue({
      populate: populate1,
    } as any);

    const result = await getusers();

    expect(result).toEqual([
      {
        id: 'abc123',
        email: 'nulls@example.com',
        name: 'Null User',
        images: [],
        likedBy: [],
        likedTo: [],
        matched: [],
      },
    ]);
  });
});

describe('Mapping helpers', () => {
  const sampleUser = {
    _id: 'id1',
    email: 'sample@example.com',
    name: 'Sample',
  };

  describe('mapLikedByUsers', () => {
    it('returns empty array when input is null', () => {
      expect(mapLikedByUsers(null)).toEqual([]);
    });
    it('returns empty array when input is undefined', () => {
      expect(mapLikedByUsers(undefined as any)).toEqual([]);
    });
    it('returns empty array when input is empty array', () => {
      expect(mapLikedByUsers([])).toEqual([]);
    });
    it('maps array of users correctly', () => {
      expect(mapLikedByUsers([sampleUser])).toEqual([mapSimpleUser(sampleUser)]);
    });
  });

  describe('mapLikedToUsers', () => {
    it('returns empty array when input is null', () => {
      expect(mapLikedToUsers(null)).toEqual([]);
    });
    it('returns empty array when input is undefined', () => {
      expect(mapLikedToUsers(undefined as any)).toEqual([]);
    });
    it('returns empty array when input is empty array', () => {
      expect(mapLikedToUsers([])).toEqual([]);
    });
    it('maps array of users correctly', () => {
      expect(mapLikedToUsers([sampleUser])).toEqual([mapSimpleUser(sampleUser)]);
    });
  });

  describe('mapMatchedUsers', () => {
    it('returns empty array when input is null', () => {
      expect(mapMatchedUsers(null)).toEqual([]);
    });
    it('returns empty array when input is undefined', () => {
      expect(mapMatchedUsers(undefined as any)).toEqual([]);
    });
    it('returns empty array when input is empty array', () => {
      expect(mapMatchedUsers([])).toEqual([]);
    });
    it('maps array of users correctly', () => {
      expect(mapMatchedUsers([sampleUser])).toEqual([mapSimpleUser(sampleUser)]);
    });
  });
});
