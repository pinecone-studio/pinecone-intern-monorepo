import { getusers } from 'src/resolvers/queries/getusers';
import { Usermodel } from 'src/models/user';

jest.mock('src/models/user');

describe('getusers resolver', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

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
          },
        ],
        likedTo: [],
      },
    ];

    const leanMock = jest.fn().mockResolvedValueOnce(mockUsers);
    const populateLikedToMock = jest.fn().mockReturnValueOnce({ lean: leanMock });
    const populateLikedByMock = jest.fn().mockReturnValueOnce({ populate: populateLikedToMock });
    jest.spyOn(Usermodel, 'find').mockReturnValue({ populate: populateLikedByMock } as unknown as ReturnType<typeof Usermodel.find>);

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
          },
        ],
        likedTo: [],
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

    const populateLikedToMock = jest.fn().mockReturnValueOnce({ lean: leanMock });
    const populateLikedByMock = jest.fn().mockReturnValueOnce({ populate: populateLikedToMock });

    jest.spyOn(Usermodel, 'find').mockReturnValue({ populate: populateLikedByMock } as unknown as ReturnType<typeof Usermodel.find>);

    const result = await getusers();

    expect(result).toEqual([
      {
        id: '123',
        email: 'user@example.com',
        name: 'User',
        likedBy: [],
        likedTo: [],
      },
    ]);
  });

  it('should return empty array when no users found', async () => {
    const leanMock = jest.fn().mockResolvedValueOnce([]);
    const populateLikedToMock = jest.fn().mockReturnValueOnce({ lean: leanMock });
    const populateLikedByMock = jest.fn().mockReturnValueOnce({ populate: populateLikedToMock });

    jest.spyOn(Usermodel, 'find').mockReturnValue({ populate: populateLikedByMock } as unknown as ReturnType<typeof Usermodel.find>);

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
    const leanMock = jest.fn().mockResolvedValueOnce(mockUsers);
    const populateLikedToMock = jest.fn().mockReturnValueOnce({ lean: leanMock });
    const populateLikedByMock = jest.fn().mockReturnValueOnce({ populate: populateLikedToMock });
    jest.spyOn(Usermodel, 'find').mockReturnValue({ populate: populateLikedByMock } as unknown as ReturnType<typeof Usermodel.find>);

    const result = await getusers();

    expect(result).toEqual([
      {
        id: '1',
        email: 'main@example.com',
        name: 'Main',
        likedBy: [{ id: '2', email: 'by@example.com', name: 'By', likedBy: [], likedTo: [] }],
        likedTo: [{ id: '3', email: 'to@example.com', name: 'To', likedBy: [], likedTo: [] }],
      },
    ]);
  });
});
