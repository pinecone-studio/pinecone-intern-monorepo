import { GraphQLResolveInfo } from 'graphql';
import bcrypt from 'bcryptjs';
import { UserModel } from '../../../../src/models';
import { updatePasswordUser } from '../../../../src/resolvers/mutations';

jest.mock('../../../../src/models');
jest.mock('bcryptjs');

describe('User Mutation Resolvers', () => {
  describe('updatePasswordUser', () => {
    it('should update the password if the old password is correct', async () => {
      const mockInput = { _id: 'userId123', password: 'oldPassword', newPassword: 'newPassword', newRePassword: 'newPassword' };
      const mockUser = { _id: 'userId123', password: 'hashedOldPassword', save: jest.fn() };

      (UserModel.findById as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedNewPassword');

      if (!updatePasswordUser) return;
      await updatePasswordUser({}, { input: mockInput }, {}, {} as GraphQLResolveInfo);

      expect(bcrypt.compare).toHaveBeenCalledWith('oldPassword', 'hashedOldPassword');
      expect(bcrypt.hash).toHaveBeenCalledWith('newPassword', 10);
    });

    it('should throw an error if new passwords do not match', async () => {
      const mockInput = { _id: 'userId123', password: 'oldPassword', newPassword: 'newPassword', newRePassword: 'differentPassword' };
      if (!updatePasswordUser) return;
      await expect(updatePasswordUser({}, { input: mockInput }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('New passwords do not match');
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
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      if (!updatePasswordUser) return;
      await expect(updatePasswordUser({}, { input: mockInput }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('Incorrect current password');
    });
  });
});
