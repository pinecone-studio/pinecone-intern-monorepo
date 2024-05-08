import { errorTypes, graphqlErrorHandler } from '@/graphql/resolvers/error';
import { resetPassword } from '@/graphql/resolvers/mutations';
import { UserModel } from '@/models';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../src/models', () => ({
  UserModel: {
    findOne: jest.fn(),
    updateOne: jest.fn().mockResolvedValueOnce(null).mockRejectedValueOnce(null),
  },
}));

describe('resetPassword resolver', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should reset password successfully', async () => {
    const user = { otp: '1234', password: 'oldPassword' };
    (UserModel.findOne as jest.Mock).mockResolvedValueOnce(user);

    const input = { email: 'test@example.com', code: '1234', newPassword: 'newPassword' };
    const result = await resetPassword!({}, { input }, {}, {} as GraphQLResolveInfo);

    expect(result).toEqual({ message: 'Нууц үг амжилттай шинэчлэгдлээ' });

    expect(UserModel.findOne).toHaveBeenCalledWith({ email: input.email, otp: input.code });

    expect(UserModel.updateOne).toHaveBeenCalledWith(
      { email: input.email },
      {
        password: input.newPassword,
        updatedAt: expect.any(Date),
        otp: null,
        otpExpiresIn: null,
      }
    );
  });

  it('should return error if an unexpected error occurs', async () => {
    (UserModel.findOne as jest.Mock).mockRejectedValueOnce(null);

    const input = { email: 'test@example.com', code: '1234', newPassword: 'newPassword' };
    const result = await resetPassword!({}, { input }, {}, {} as GraphQLResolveInfo);

    expect(result).toEqual(graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.BAD_REQUEST));

    expect(UserModel.findOne).toHaveBeenCalledWith({ email: input.email, otp: input.code });

    expect(UserModel.updateOne).not.toHaveBeenCalled();
  });

  it('should return error if user not found', async () => {
    (UserModel.findOne as jest.Mock).mockResolvedValueOnce(null);

    const input = { email: 'nonexistent@example.com', code: '1234', newPassword: 'newPassword' };
    const result = await resetPassword!({}, { input }, {}, {} as GraphQLResolveInfo);

    expect(result).toEqual(graphqlErrorHandler({ message: 'Нэг удаагын код буруу байна' }, errorTypes.NOT_FOUND));

    expect(UserModel.findOne).toHaveBeenCalledWith({ email: input.email, otp: input.code });

    expect(UserModel.updateOne).not.toHaveBeenCalled();
  });

  it('should return error if OTP is expired', async () => {
    const user = { otp: 'expiredOTP', otpExpiresIn: 100 };
    (UserModel.findOne as jest.Mock).mockResolvedValueOnce(user);

    const input = { email: 'test@example.com', code: 'expiredOTP', newPassword: 'newPassword' };
    const result = await resetPassword!({}, { input }, {}, {} as GraphQLResolveInfo);

    expect(result).toEqual(graphqlErrorHandler({ message: 'Нэг удаагын кодны хугацаа дууссан байна' }, errorTypes.BAD_REQUEST));

    expect(UserModel.findOne).toHaveBeenCalledWith({ email: input.email, otp: input.code });

    expect(UserModel.updateOne).not.toHaveBeenCalled();
  });
});
