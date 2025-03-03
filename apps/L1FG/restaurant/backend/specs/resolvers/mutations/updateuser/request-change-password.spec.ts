import { sendEmail } from '../../../../src/library/nodemailer';
import { GraphQLResolveInfo } from 'graphql';
import { UserModel } from '../../../../src/models';
import { requestChangePassword } from '../../../../src/resolvers/mutations';

jest.mock('../../../../src/models');
jest.mock('../../../../src/library/nodemailer');
jest.mock('otp-agent', () => ({
  generateOTP: jest.fn(() => '123456'),
}));

describe('Request Change Password', () => {
  it('should generate an OTP, update the user, and send an email', async () => {
    const mockInput = { email: 'email@example.com' };
    const mockUpdatedUser = { email: 'email@example.com', otp: '123456' };

    // Mock findOneAndUpdate to return the updated user
    (UserModel.findOneAndUpdate as jest.Mock).mockResolvedValue(mockUpdatedUser);

    // Mock sendEmail to resolve successfully
    (sendEmail as jest.Mock).mockResolvedValue(undefined);

    if (!requestChangePassword) return;

    const result = await requestChangePassword({}, { input: mockInput }, {}, {} as GraphQLResolveInfo);

    // Ensure findOneAndUpdate was called correctly
    expect(UserModel.findOneAndUpdate).toHaveBeenCalledWith({ email: mockInput.email }, { otp: '123456' }, { new: true });

    // Ensure sendEmail was called with correct arguments
    expect(sendEmail).toHaveBeenCalledWith(mockInput.email, 'Your OTP is 123456');

    // Ensure the function returns expected output
    expect(result).toEqual({ email: mockInput.email });
  });

  it('should still return the email even if no user is found', async () => {
    const mockInput = { email: 'nonexistent@example.com' };

    // Mock findOneAndUpdate to return null (user not found)
    (UserModel.findOneAndUpdate as jest.Mock).mockResolvedValue(null);

    // Mock sendEmail to still execute (for security reasons, we may not reveal if the email exists)
    (sendEmail as jest.Mock).mockResolvedValue(undefined);

    if (!requestChangePassword) return;
    const result = await requestChangePassword({}, { input: mockInput }, {}, {} as GraphQLResolveInfo);

    // Ensure findOneAndUpdate was still called
    expect(UserModel.findOneAndUpdate).toHaveBeenCalledWith({ email: mockInput.email }, { otp: '123456' }, { new: true });

    // Ensure sendEmail was still called (this is a security practice)
    expect(sendEmail).toHaveBeenCalledWith(mockInput.email, 'Your OTP is 123456');

    // Ensure the function returns expected output
    expect(result).toEqual({ email: mockInput.email });
  });
});
