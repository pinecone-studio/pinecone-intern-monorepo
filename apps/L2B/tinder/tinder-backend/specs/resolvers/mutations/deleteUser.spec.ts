import { userModel } from '../../../src/models';
import { deleteUser } from '../../../src/resolvers/mutations/delete-user';

jest.mock('../../../src/models', () => ({
  userModel: {
    deleteMany: jest.fn(),
  },
}));

describe('deleteUser mutation', () => {
  it('should call userModel.deleteMany with correct email', async () => {
    (userModel.deleteMany as jest.Mock).mockResolvedValueOnce({ acknowledged: true, deletedCount: 1 });

    const result = await deleteUser();

    expect(userModel.deleteMany).toHaveBeenCalledWith({ email: /test/i });
    expect(result).toBe(true);
  });

  it('should throw error if delete fails', async () => {
    (userModel.deleteMany as jest.Mock).mockRejectedValueOnce(new Error('DB error'));

    await expect(deleteUser()).rejects.toThrow('failed to delete user');
  });
});
