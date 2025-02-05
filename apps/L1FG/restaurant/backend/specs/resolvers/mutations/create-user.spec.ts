import jwt from 'jsonwebtoken';
import { UserModel } from '../../../src/models';
import { GraphQLResolveInfo } from 'graphql';
import { createUser } from '../../../src/resolvers/mutations';

jest.mock('../../../src/models', () => ({
  UserModel: {
    findOne: jest.fn(),
    create: jest.fn(),
  },
}));
jest.mock('jsonwebtoken');

const input = { email: 'test@example.com', password: 'password123', rePassword: 'password123', userName: 'testuser' };

describe('createUser Resolver', () => {
  const mockUser = { _id: '12345', email: 'test@example.com', password: 'password123', rePassword: 'password123', userName: 'testuser' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new user and return a token', async () => {
    (UserModel.findOne as jest.Mock).mockResolvedValue(null);
    (UserModel.create as jest.Mock).mockResolvedValue(mockUser);
    (jwt.sign as jest.Mock).mockReturnValue('mockToken');
    if (!createUser) return;
    const result = await createUser({}, { input }, {}, {} as GraphQLResolveInfo);

    expect(UserModel.findOne).toHaveBeenCalledWith({ email: input.email });
    expect(UserModel.create).toHaveBeenCalledWith(input);
    expect(jwt.sign).toHaveBeenCalledWith({ userId: mockUser._id }, process.env.JWT_SECRET!);
    expect(result).toEqual({ user: mockUser, token: 'mockToken' });
  });

  it('should throw an error if user already exists', async () => {
    (UserModel.findOne as jest.Mock).mockResolvedValue(mockUser);
    if (!createUser) return;
    await expect(createUser({}, { input }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('User already exists');
    expect(UserModel.findOne).toHaveBeenCalledWith({ email: input.email });
    expect(UserModel.create).not.toHaveBeenCalled();
  });
});
