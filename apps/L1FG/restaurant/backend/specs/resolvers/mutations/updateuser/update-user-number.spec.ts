import { GraphQLResolveInfo } from 'graphql';
import { UserModel } from '../../../../src/models';
import { updateNumberUser } from 'apps/L1FG/restaurant/backend/src/resolvers/mutations';

jest.mock('../../../../src/models');

describe('User Mutation Resolvers', () => {
  describe('updateNumberUser', () => {
    it('should update the number of the user and return the updated user', async () => {
      const mockInput = { _id: 'userId123', newPhoneNumber: '99887766' };
      const mockUpdatedUser = {
        _id: 'userId123',
        email: 'newemail@example.com',
        userName: 'testuser',
        phoneNumber: '99887766',
        profileImage: 'newProfile.png',
      };

      (UserModel.findById as jest.Mock).mockResolvedValue({ phoneNumber: null, save: jest.fn() });
      (UserModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockUpdatedUser);

      if (!updateNumberUser) return;
      const result = await updateNumberUser({}, { input: mockInput }, {}, {} as GraphQLResolveInfo);

      expect(UserModel.findByIdAndUpdate).toHaveBeenCalledWith(mockInput._id, { phoneNumber: mockInput.newPhoneNumber }, { new: true });
      expect(result).toEqual(mockUpdatedUser);
    });

    it('should throw an error if the phone number is not 8 digits', async () => {
      const mockInput = { _id: 'userId123', newPhoneNumber: '1234567' }; // Invalid (7 digits)

      if (!updateNumberUser) return;
      await expect(updateNumberUser({}, { input: mockInput }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('Phone number must be exactly 8 digits and contain only numbers');
    });

    it('should throw an error if the phone number contains non-numeric characters', async () => {
      const mockInput = { _id: 'userId123', newPhoneNumber: '1234abcd' }; // Invalid (letters included)

      if (!updateNumberUser) return;
      await expect(updateNumberUser({}, { input: mockInput }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('Phone number must be exactly 8 digits and contain only numbers');
    });
    it('should throw an error if the user is not found', async () => {
      // Mock input
      const mockInput = { _id: 'nonExistentUserId', newPhoneNumber: '99887766' };

      // Ensure `findByIdAndUpdate` returns null (user not found)
      (UserModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

      if (!updateNumberUser) return;

      await expect(updateNumberUser({}, { input: mockInput }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('User not found');

      // Ensure findByIdAndUpdate was called correctly
      expect(UserModel.findByIdAndUpdate).toHaveBeenCalledWith(mockInput._id, { phoneNumber: mockInput.newPhoneNumber }, { new: true });
    });
  });
});
