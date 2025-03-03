import { GraphQLResolveInfo } from 'graphql';
import { UserModel } from '../../../../src/models';
import { updateEmailUser } from '../../../../src/resolvers/mutations/updateuser/update-user-email';

jest.mock('../../../../src/models');

describe('User Mutation Resolvers', () => {
  describe('updateEmailUser', () => {
    it('should update the email of the user and return the updated user', async () => {
      const mockInput = { _id: 'userId123', newEmail: 'newemail@example.com' };
      const mockUpdatedUser = {
        _id: 'userId123',
        email: 'newemail@example.com',
        userName: 'testuser',
        phoneNumber: '1234567890',
      };

      (UserModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockUpdatedUser);
      if (!updateEmailUser) return;
      const result = await updateEmailUser({}, { input: mockInput }, {}, {} as GraphQLResolveInfo);

      expect(UserModel.findByIdAndUpdate).toHaveBeenCalledWith(mockInput._id, { email: mockInput.newEmail }, { new: true });

      expect(result).toEqual(mockUpdatedUser);
    });

    it('should throw an error if the user is not found', async () => {
      const mockInput = { _id: 'nonExistentUserId', newEmail: 'newemail@example.com' };

      (UserModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);
      if (!updateEmailUser) return;
      await expect(updateEmailUser({}, { input: mockInput }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('User not found');

      expect(UserModel.findByIdAndUpdate).toHaveBeenCalledWith(mockInput._id, { email: mockInput.newEmail }, { new: true });
    });
  });
});
