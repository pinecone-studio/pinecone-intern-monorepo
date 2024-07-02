import { reportSignIn } from '../../src/graphql/resolvers/mutations/report-signin';
import { UserModel } from '@/graphql/models';
import jwt from 'jsonwebtoken';
import { GraphQLError, GraphQLResolveInfo } from 'graphql';

jest.mock('@/graphql/models', () => ({
  UserModel: {
    findOne: jest.fn(),
  },
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}));

const input = {
  email: 'mockEmail@gmail.com',
  password: '12345678',
};

describe('Sign in', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should sign in a user successfully', async () => {
    const userMock = {
      _id: 'userId',
      firstName: 'John Doe',
      lastName: 'Doedoe',
      email: 'mockEmail@gmail.com',
      role: 'STUDENT',
      password: '12345678',
    };
    const id = 'userId';
    const userEmail = 'mockEmail@gmail.com';
    const name = 'John Doe';
    const role = 'STUDENT';

    (UserModel.findOne as jest.Mock).mockResolvedValueOnce(userMock);
    (jwt.sign as jest.Mock).mockReturnValueOnce('mockToken');

    const result = await reportSignIn!({}, { input }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      token: 'mockToken',
      message: 'Successful authentication',
    });
    expect(UserModel.findOne).toHaveBeenCalledWith({ email: input.email, password: input.password });
    expect(jwt.sign).toHaveBeenCalledWith({ id, name, userEmail, role }, 'temporary-secret-key');
  });

  it('should throw an error if user is not found', async () => {
    (UserModel.findOne as jest.Mock).mockResolvedValueOnce(null);

    await expect(reportSignIn!({}, { input }, {}, {} as GraphQLResolveInfo)).rejects.toThrow(new GraphQLError('Sign in failure'));
    expect(UserModel.findOne).toHaveBeenCalledWith({ email: input.email, password: input.password });
    expect(jwt.sign).not.toHaveBeenCalled();
  });

  it('should throw a generic error on unexpected errors', async () => {
    (UserModel.findOne as jest.Mock).mockRejectedValueOnce(new Error('Unexpected error'));

    await expect(reportSignIn!({}, { input }, {}, {} as GraphQLResolveInfo)).rejects.toThrow(new GraphQLError('Sign in failure'));
    expect(UserModel.findOne).toHaveBeenCalledWith({ email: input.email, password: input.password });
    expect(jwt.sign).not.toHaveBeenCalled();
  });
});
