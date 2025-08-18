import { editProfile } from '../../../../src/resolvers/mutations/user/edit-profile';
import { User } from '../../../../src/models/user.model';

jest.mock('../../../../src/models/user.model');
const MockedUser = User as jest.Mocked<typeof User>;

describe('editProfile', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should update profile successfully', async () => {
		const userId = '507f1f77bcf86cd799439011';
		const updateData = { fullName: 'New Name', bio: 'New bio', isPrivate: true };

		const existingUser = { _id: userId } as any;
		const updatedUser = { _id: userId, ...updateData } as any;

		MockedUser.findById.mockResolvedValue(existingUser as any);
		MockedUser.findByIdAndUpdate.mockResolvedValue(updatedUser as any);

		const result = await editProfile(null as any, { userId, ...updateData });

		expect(MockedUser.findById).toHaveBeenCalledWith(userId);
		expect(MockedUser.findByIdAndUpdate).toHaveBeenCalledWith(
			userId,
			{ $set: updateData },
			{ new: true }
		);
		expect(result).toEqual({
			success: true,
			message: 'Profile updated successfully',
			user: updatedUser,
		});
	});

	it('should return error when user not found', async () => {
		const userId = '507f1f77bcf86cd799439012';
		MockedUser.findById.mockResolvedValue(null as any);

		const result = await editProfile(null as any, { userId, fullName: 'Test' });

		expect(result).toEqual({ success: false, message: 'User not found', user: null });
		expect(MockedUser.findByIdAndUpdate).not.toHaveBeenCalled();
	});

	it('should handle database error', async () => {
		const userId = '507f1f77bcf86cd799439013';
		MockedUser.findById.mockRejectedValue(new Error('Database error'));

		const result = await editProfile(null as any, { userId, bio: 'x' });

		expect(result).toEqual({ success: false, message: 'Failed to update profile', user: null });
	});
}); 