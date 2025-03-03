import { GraphQLResolveInfo } from 'graphql';

import bcrypt from 'bcryptjs';
import { changePassword } from '../../../../src/resolvers/mutations';
import { UserModel } from '../../../../src/models';

jest.mock('../../../../src/models');
jest.mock('bcryptjs', () => ({
  hash: jest.fn((password) => Promise.resolve(`hashed_${password}`)), // Mock password hashing
}));

describe('Change Password', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully change the password', async () => {
    const mockInput = { _id: 'userId123', newPassword: 'newPass12', newRePassword: 'newPass12' };
    const mockUser = { _id: 'userId123', email: 'email@example.com', password: 'oldPass', save: jest.fn() };

    // Mock findById to return a user
    (UserModel.findById as jest.Mock).mockResolvedValue(mockUser);

    // Mock updateOne to simulate successful update
    (UserModel.updateOne as jest.Mock).mockResolvedValue({ acknowledged: true, modifiedCount: 1 });
    if (!changePassword) return;
    // Run mutation
    await changePassword({}, { input: mockInput }, {}, {} as GraphQLResolveInfo);

    // Assertions
    expect(bcrypt.hash).toHaveBeenCalledWith('newPass12', 10);
  });

  it('should throw an error if passwords do not match', async () => {
    const mockInput = { _id: 'userId123', newPassword: 'newPass12', newRePassword: 'wrongPass' };

    if (!changePassword) return;
    await expect(changePassword({}, { input: mockInput }, {}, {} as GraphQLResolveInfo)).rejects.toThrowError(new Error('Passwords do not match'));
  });

  it('should throw an error if user is not found', async () => {
    const mockInput = { _id: 'nonexistentId', newPassword: 'newPass12', newRePassword: 'newPass12' };

    // Mock findById to return null (user not found)
    (UserModel.findById as jest.Mock).mockResolvedValue(null);

    if (!changePassword) return;
    await expect(changePassword({}, { input: mockInput }, {}, {} as GraphQLResolveInfo)).rejects.toThrowError(new Error('User not found'));
  });
});
