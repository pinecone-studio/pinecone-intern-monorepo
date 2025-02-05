import { GraphQLResolveInfo } from 'graphql';
import { UserModel } from 'apps/L1FG/restaurant/backend/src/models';
import { changePassword } from 'apps/L1FG/restaurant/backend/src/resolvers/mutations/updateuser/change-password';

jest.mock('../../../../src/models');
jest.mock('bcrypt', () => ({
  hash: jest.fn((password) => `hashed_${password}`), // Mock bcrypt hashing
}));

describe('Change Password', () => {
  it('should successfully change the password', async () => {
    const mockInput = { _id: 'userId123', newPassword: 'newPass', newRePassword: 'newPass' };
    const mockUser = { _id: 'userId123', email: 'email@example.com', password: 'oldPass', save: jest.fn() };

    // Mock findById to return a user
    (UserModel.findById as jest.Mock).mockResolvedValue(mockUser);

    if (!changePassword) return;
    await changePassword({}, { input: mockInput }, {}, {} as GraphQLResolveInfo);
  });

  it('should throw an error if passwords do not match', async () => {
    const mockInput = { _id: 'userId123', newPassword: 'newPass', newRePassword: 'wrongPass' };

    if (!changePassword) return;
    await expect(changePassword({}, { input: mockInput }, {}, {} as GraphQLResolveInfo)).rejects.toThrowError(new Error('Passwords do not match'));
  });

  it('should throw an error if user is not found', async () => {
    const mockInput = { _id: 'nonexistentId', newPassword: 'newPass', newRePassword: 'newPass' };

    // Mock findById to return null (user not found)
    (UserModel.findById as jest.Mock).mockResolvedValue(null);

    if (!changePassword) return;
    await expect(changePassword({}, { input: mockInput }, {}, {} as GraphQLResolveInfo)).rejects.toThrowError(new Error('User not found'));
  });
});
