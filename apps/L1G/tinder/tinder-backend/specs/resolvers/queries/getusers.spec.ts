import { Usermodel } from 'src/models/user';
import { getusers } from 'src/resolvers/queries/getusers';

jest.mock('src/models/user');

describe('getusers resolver', () => {
  it('should return transformed users with likedBy and likedTo', async () => {
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

    const leanMock = jest.fn().mockResolvedValue(mockUsers);
    const populate2Mock = jest.fn().mockReturnValue({ lean: leanMock });
    const populate1Mock = jest.fn().mockReturnValue({ populate: populate2Mock });
    (Usermodel.find as jest.Mock).mockReturnValue({ populate: populate1Mock });

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

    expect(Usermodel.find).toHaveBeenCalled();
    expect(populate1Mock).toHaveBeenCalledWith('likedBy', '_id email name');
    expect(populate2Mock).toHaveBeenCalledWith('likedTo', '_id email name');
    expect(leanMock).toHaveBeenCalled();
  });

  it('should throw a readable error on failure', async () => {
    (Usermodel.find as jest.Mock).mockImplementation(() => {
      throw new Error('DB query failed');
    });

    await expect(getusers()).rejects.toThrow('DB query failed');
  });
});
