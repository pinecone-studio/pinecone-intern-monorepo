import { getAllUsers } from '../../../src/resolvers/queries';
import { userModel } from '../../../src/models/user/user.model';

jest.mock('../../../src/models/user/user.model.ts', () => ({
  userModel: {
    find: jest.fn().mockResolvedValueOnce([{ id: '123', name: 'Test User' }]),
  },
}));

describe('getAllUsers', () => {
  it('should return all users', async () => {
    const result = await getAllUsers!();
    expect(result).toEqual([{ id: '123', name: 'Test User' }]);
  });

  it('should fetching users fails', async () => {
    (userModel.find as jest.Mock).mockRejectedValueOnce(new Error('Failed to get all users'));
    await expect(getAllUsers!()).rejects.toThrow('Failed to get all users');
  });
});
