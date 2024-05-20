import { lessonSignIn } from '../../src/graphql/resolvers/mutations/sign-in';
import { UserModel } from '@/model';
import jwt from 'jsonwebtoken';
import { GraphQLError, GraphQLResolveInfo } from 'graphql';

jest.mock('@/model', () => ({
  UserModel: {
    findOne: jest.fn(),
  },
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}));

const input = {
  emailOrPhoneNumber: 'mockEmail@gmail.com',
  password: '12345678',
};

describe('Sign in', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should sign in a user successfully', async () => {
    const userMock = {
      _id: 'userId',
      name: 'John Doe',
      email: 'mockEmail@gmail.com',
      role: 'сурагч',
      phoneNumber: '99999999',
      password: '12345678',
    };

    (UserModel.findOne as jest.Mock).mockResolvedValueOnce(userMock);
    (jwt.sign as jest.Mock).mockReturnValueOnce('mockToken');

    const result = await lessonSignIn!({}, { input }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      token: 'mockToken',
      message: 'Амжилттай нэвтэрлээ',
    });
    expect(UserModel.findOne).toHaveBeenCalledWith({
      $or: [
        { email: input.emailOrPhoneNumber, password: input.password },
        { phoneNumber: input.emailOrPhoneNumber, password: input.password },
      ],
    });
    expect(jwt.sign).toHaveBeenCalledWith({ id: userMock._id, name: userMock.name, email: userMock.email, role: userMock.role }, 'secret-key');
  });

  it('should throw an error if user is not found', async () => {
    (UserModel.findOne as jest.Mock).mockResolvedValueOnce(null);

    await expect(lessonSignIn!({}, { input }, {}, {} as GraphQLResolveInfo)).rejects.toThrow(new GraphQLError('Бүртгэлтэй хэрэглэгч алга'));
    expect(UserModel.findOne).toHaveBeenCalledWith({
      $or: [
        { email: input.emailOrPhoneNumber, password: input.password },
        { phoneNumber: input.emailOrPhoneNumber, password: input.password },
      ],
    });
    expect(jwt.sign).not.toHaveBeenCalled();
  });

  it('should throw a generic error on unexpected errors', async () => {
    (UserModel.findOne as jest.Mock).mockRejectedValueOnce(new Error('Unexpected error'));

    await expect(lessonSignIn!({}, { input }, {}, {} as GraphQLResolveInfo)).rejects.toThrow(new GraphQLError('Алдаа гарлаа'));
    expect(UserModel.findOne).toHaveBeenCalledWith({
      $or: [
        { email: input.emailOrPhoneNumber, password: input.password },
        { phoneNumber: input.emailOrPhoneNumber, password: input.password },
      ],
    });
    expect(jwt.sign).not.toHaveBeenCalled();
  });
});
