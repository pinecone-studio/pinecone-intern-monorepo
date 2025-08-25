import { getUser } from '../../../../src/resolvers/queries/user/get-user';
import { User } from '../../../../src/models/user.model';

jest.mock('../../../../src/models/user.model');
const MockedUser = User as jest.Mocked<typeof User>;

describe('getUser query', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should return user when found', async () => {
		const userId = '507f1f77bcf86cd799439011';
		const mockUser = { _id: userId, userName: 'john' } as any;
		MockedUser.findById.mockResolvedValue(mockUser);

		const result = await getUser(null as any, { _id: userId });

		expect(MockedUser.findById).toHaveBeenCalledWith(userId);
		expect(result).toBe(mockUser);
	});

	it('should throw when user not found', async () => {
		const userId = '507f1f77bcf86cd799439012';
		MockedUser.findById.mockResolvedValue(null as any);

		await expect(getUser(null as any, { _id: userId })).rejects.toThrow('User not found');
	});

	it('should surface DB errors', async () => {
		const userId = '507f1f77bcf86cd799439013';
		MockedUser.findById.mockRejectedValue(new Error('Database error'));

		await expect(getUser(null as any, { _id: userId })).rejects.toThrow('Database error');
	});

	it('should wrap non-Error exceptions as generic error', async () => {
		const userId = '507f1f77bcf86cd799439014';
		(MockedUser.findById as jest.Mock).mockImplementation(() => { throw 'string error'; });

		await expect(getUser(null as any, { _id: userId })).rejects.toThrow('Failed to get user');
	});
}); 