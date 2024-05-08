import { sendMail } from '@/graphql/resolvers/mutations';
import { UserModel } from '@/models';
import { GraphQLResolveInfo } from 'graphql';
import nodemailer from 'nodemailer';
import otpGenerator from 'otp-generator';
import { errorTypes, graphqlErrorHandler } from '@/graphql/resolvers/error';

const input = {
  email: 'test@test.com',
};

jest.mock('nodemailer');

jest.mock('otp-generator');

jest.mock('../../src/models', () => ({
  UserModel: {
    findOne: jest.fn(),
    updateOne: jest.fn(),
  },
}));

describe('sendMail resolver', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should send mail with OTP and update user', async () => {
    const mockUser = { _id: 'user_id' };
    const mockMailOptions = {
      from: 'uulaaka73@gmail.com',
      to: 'test@test.com',
      subject: 'Pinecone',
      text: 'Нэг удаагын code: 1234',
    };

    (UserModel.findOne as jest.Mock).mockResolvedValueOnce(mockUser);

    (otpGenerator.generate as jest.Mock).mockReturnValueOnce('1234');

    const mockTransporterSendMail = jest.fn();
    (nodemailer.createTransport as jest.Mock).mockReturnValueOnce({
      sendMail: mockTransporterSendMail,
    });

    await sendMail!({}, { input: { email: 'test@test.com' } }, {}, {} as GraphQLResolveInfo);

    expect(UserModel.findOne).toHaveBeenCalledWith({ email: 'test@test.com' });

    expect(nodemailer.createTransport).toHaveBeenCalledWith({
      service: 'Gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'uulaaka73@gmail.com',
        pass: 'utrhxcutldbgdjuk',
      },
    });

    expect(mockTransporterSendMail).toHaveBeenCalledWith(mockMailOptions);
  });
  it('it should throw user not found error', async () => {
    try {
      await sendMail!({}, { input }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: 'Бүртгэлтэй хэрэглэгч алга' }, errorTypes.NOT_FOUND));
    }
  });

  it('it should throw error', async () => {
    try {
      (UserModel.findOne as jest.Mock).mockRejectedValueOnce(null);
      await sendMail!({}, { input }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.BAD_REQUEST));
    }
  });
});
