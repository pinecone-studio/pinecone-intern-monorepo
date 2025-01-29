import { GraphQLResolveInfo } from 'graphql';
import bcrypt from 'bcrypt';
import { UserModel } from '../../../../src/models';
import { updatePasswordUser } from 'apps/L1FG/restaurant/backend/src/resolvers/mutations';

jest.mock('../../../../src/models'); // Corrected the mock path
jest.mock('bcrypt'); // Mock bcrypt

describe('User Mutation Resolvers', () => {
  describe('updatePasswordUser', () => {
    it('should update the password if the old password is correct', async () => {
      const mockInput = { _id: 'userId123', password: 'oldPassword', newPassword: 'newPassword', newRePassword: 'newPassword' };
      const mockUser = { _id: 'userId123', password: 'hashedOldPassword', save: jest.fn() };

      (UserModel.findById as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true); // Simulate correct password
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedNewPassword'); // Simulate new password hash

      if (!updatePasswordUser) return;
      const result = await updatePasswordUser({}, { input: mockInput }, {}, {} as GraphQLResolveInfo);

      expect(bcrypt.compare).toHaveBeenCalledWith('oldPassword', 'hashedOldPassword');
      expect(bcrypt.hash).toHaveBeenCalledWith('newPassword', 10);
      expect(mockUser.password).toBe('hashedNewPassword');
      expect(mockUser.save).toHaveBeenCalled();
      expect(result).toBeDefined();
    });

    it('should throw an error if passwords do not match', async () => {
      const mockInput = { _id: 'userId123', password: 'oldPassword', newPassword: 'newPassword', newRePassword: 'differentPassword' };

      if (!updatePasswordUser) return;
      await expect(updatePasswordUser({}, { input: mockInput }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('Passwords do not match');
    });

    it('should throw an error if user is not found', async () => {
      const mockInput = { _id: 'nonExistentUserId', password: 'oldPassword', newPassword: 'newPassword', newRePassword: 'newPassword' };

      (UserModel.findById as jest.Mock).mockResolvedValue(null);

      if (!updatePasswordUser) return;
      await expect(updatePasswordUser({}, { input: mockInput }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('User not found');
    });

    it('should throw an error if the current password is incorrect', async () => {
      const mockInput = { _id: 'userId123', password: 'wrongPassword', newPassword: 'newPassword', newRePassword: 'newPassword' };
      const mockUser = { _id: 'userId123', password: 'hashedOldPassword', save: jest.fn() };

      (UserModel.findById as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false); // Simulate incorrect password

      if (!updatePasswordUser) return;
      await expect(updatePasswordUser({}, { input: mockInput }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('Incorrect current password');
    });
  });
});
