import { sendEmail } from '../../../../src/library/nodemailer';
import { UserModel } from '../../../../src/models';
import { RequestChangePassword } from '../../../../src/resolvers/mutations';

import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models');
jest.mock('../../../../src/library/nodemailer');
jest.mock('otp-agent', () => ({
  generateOTP: jest.fn(() => '123456'),
}));

describe('Request Change Password', () => {
  it('should generate an OTP, update the user, and send an email', async () => {
    const mockInput = { email: 'email@example.com' };
    const mockUpdatedUser = { email: 'email@example.com', otp: '123456' };
    (UserModel.findOne as jest.Mock).mockResolvedValue({});
    (UserModel.findOneAndUpdate as jest.Mock).mockResolvedValue(mockUpdatedUser);

    (sendEmail as jest.Mock).mockResolvedValue(undefined);

    if (!RequestChangePassword) return;

    const result = await RequestChangePassword({}, { input: mockInput }, {}, {} as GraphQLResolveInfo);

    expect(UserModel.findOneAndUpdate).toHaveBeenCalledWith({ email: mockInput.email }, { otp: '123456' }, { new: true });

    expect(sendEmail).toHaveBeenCalledWith(mockInput.email, 'Your OTP is 123456');

    expect(result).toEqual({ email: mockInput.email });
  });

  it('should still return the email even if no user is found', async () => {
    const mockInput = { email: 'nonxistent@example.com' };

    (UserModel.findOne as jest.Mock).mockResolvedValue({});
    (UserModel.findOneAndUpdate as jest.Mock).mockResolvedValue(null);

    (sendEmail as jest.Mock).mockResolvedValue(undefined);

    if (!RequestChangePassword) return;
    const result = await RequestChangePassword({}, { input: mockInput }, {}, {} as GraphQLResolveInfo);

    expect(UserModel.findOneAndUpdate).toHaveBeenCalledWith({ email: mockInput.email }, { otp: '123456' }, { new: true });

    expect(sendEmail).toHaveBeenCalledWith(mockInput.email, 'Your OTP is 123456');

    expect(result).toEqual({ email: mockInput.email });
  });
  it(' no user ', async () => {
    const mockInput = { email: 'nonxistent@example.com' };

    (UserModel.findOneAndUpdate as jest.Mock).mockResolvedValue(null);
    (UserModel.findOne as jest.Mock).mockResolvedValue(null);
    (sendEmail as jest.Mock).mockResolvedValue(undefined);

    if (!RequestChangePassword) return;
    await expect(RequestChangePassword({}, { input: mockInput }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('Таны имэйл олдсонгүй');
  });
});
