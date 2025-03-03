import { GraphQLResolveInfo } from 'graphql';
import { UserModel } from '../../../../src/models';
import { updateUserImage } from '../../../../src/resolvers/mutations';

jest.mock('../../../../src/models');

describe('User Mutation Resolvers', () => {
  describe('updateImageUser', () => {
    it('should update the image of the user and return the updated user', async () => {
      const mockInput = { _id: 'userId123', profileImage: 'newProfile.png' };
      const mockUpdatedUser = {
        _id: 'userId123',
        email: 'newemail@example.com',
        userName: 'testuser',
        phoneNumber: '1234567890',
        profileImage: 'newProfile.png',
      };

      (UserModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockUpdatedUser);
      if (!updateUserImage) return;
      const result = await updateUserImage({}, { input: mockInput }, {}, {} as GraphQLResolveInfo);

      expect(UserModel.findByIdAndUpdate).toHaveBeenCalledWith(mockInput._id, { profileImage: mockInput.profileImage }, { new: true });

      expect(result).toEqual(mockUpdatedUser);
    });

    it('should throw an error if the user is not found', async () => {
      const mockInput = { _id: 'nonExistentUserId', profileImage: 'newProfile.png' };

      (UserModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);
      if (!updateUserImage) return;
      await expect(updateUserImage({}, { input: mockInput }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('User not found');

      expect(UserModel.findByIdAndUpdate).toHaveBeenCalledWith(mockInput._id, { profileImage: mockInput.profileImage }, { new: true });
    });
  });
});
