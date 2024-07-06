import { glmsLogIn } from '@/graphql/resolvers/mutations';
import glmsUserModel from '@/graphql/models/user.model';
import jwt from 'jsonwebtoken';
import { GraphQLError, GraphQLResolveInfo } from 'graphql';

jest.mock('../../src/graphql/models/user.model', () => ({
  glmsUserModel: {
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
    const firstName = 'John Doe';
    const lastName = 'Doedoe';
    const role = 'STUDENT';

    glmsUserModel.findOne = jest.fn().mockResolvedValueOnce(userMock);
    jwt.sign = jest.fn().mockReturnValueOnce('mockToken');

    const result = await glmsLogIn!({}, { input }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      token: 'mockToken',
      message: 'Successful authentication',
    });
    expect(jwt.sign).toHaveBeenCalledWith({ id, firstName, lastName, userEmail, role }, 'temporary-secret-key');
  });

  it('should throw an error if user is not found', async () => {
    glmsUserModel.findOne = jest.fn().mockResolvedValueOnce(null);

    await expect(glmsLogIn!({}, { input }, {}, {} as GraphQLResolveInfo)).rejects.toThrow(new GraphQLError('Sign in failure'));
    expect(jwt.sign).not.toHaveBeenCalled();
  });

  it('should throw a generic error on unexpected errors', async () => {
    glmsUserModel.findOne = jest.fn().mockRejectedValueOnce(new Error('Unexpected error'));

    await expect(glmsLogIn!({}, { input }, {}, {} as GraphQLResolveInfo)).rejects.toThrow(new GraphQLError('Sign in failure'));
    expect(jwt.sign).not.toHaveBeenCalled();
  });
});
