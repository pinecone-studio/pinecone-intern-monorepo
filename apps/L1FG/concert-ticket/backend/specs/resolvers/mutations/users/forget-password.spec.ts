import { UserModel } from '../../../../src/models';
import { UpdateForgetPasswordInput } from '../../../../src/resolvers/mutations';

import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models');

describe('Restore Forget Password', () => {
  it('should restore the password of the user and return updated user and token', async () => {
    const mockInput = { email: 'email@example.com', otp: '123456' };
    const mockUser = { email: 'email@example.com', otp: '123456' };

    (UserModel.findOne as jest.Mock).mockResolvedValue(mockUser);

    (UserModel.updateOne as jest.Mock).mockResolvedValue({ acknowledged: true });

    if (!UpdateForgetPasswordInput) return;

    const result = await UpdateForgetPasswordInput({}, { input: mockInput }, {}, {} as GraphQLResolveInfo);

    // Ensure findOne was called with correct filter
    expect(UserModel.findOne).toHaveBeenCalledWith({ email: mockInput.email });

    // Ensure updateOne was called to clear the OTP
    expect(UserModel.updateOne).toHaveBeenCalledWith({ email: mockInput.email }, { otp: '' });

    // Check the final result
    expect(result).toEqual({ token: 'newToken', user: mockUser });
  });

  it('should throw an error if the user is not found', async () => {
    const mockInput = { email: 'nonexistent@example.com', otp: '123456' };

    // Mock findOne to return null (user not found)
    (UserModel.findOne as jest.Mock).mockResolvedValue(null);

    if (!UpdateForgetPasswordInput) return;
    await expect(UpdateForgetPasswordInput({}, { input: mockInput }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('User not found');
  });

  it('should throw an error if the OTP is invalid', async () => {
    const mockInput = { email: 'email@example.com', otp: 'wrongOtp' };
    const mockUser = { email: 'email@example.com', otp: '123456' };

    (UserModel.findOne as jest.Mock).mockResolvedValue(mockUser);

    if (!UpdateForgetPasswordInput) return;
    await expect(UpdateForgetPasswordInput({}, { input: mockInput }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('Invalid OTP');
  });
});
