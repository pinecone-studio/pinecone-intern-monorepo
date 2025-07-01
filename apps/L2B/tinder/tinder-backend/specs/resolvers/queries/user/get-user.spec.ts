import { userModel } from 'apps/L2B/tinder/tinder-backend/src/models';
import { getUsers } from 'apps/L2B/tinder/tinder-backend/src/resolvers/queries';

jest.mock('../../../../src/models/', () => ({
  userModel: {
    find: jest.fn(),
  },
}));

describe('getUsers', () => {
  it('should return all users from the database', async () => {
    const mockUsers = [
      { _id: '1', name: 'Alice' },
      { _id: '2', name: 'Bob' },
    ];

    (userModel.find as jest.Mock).mockResolvedValue(mockUsers);

    const result = await getUsers();

    expect(userModel.find).toHaveBeenCalledWith({});
    expect(result).toEqual(mockUsers);
  });

  it('should return an empty array if no users found', async () => {
    (userModel.find as jest.Mock).mockResolvedValue([]);

    const result = await getUsers();

    expect(userModel.find).toHaveBeenCalledWith({});
    expect(result).toEqual([]);
  });
});
