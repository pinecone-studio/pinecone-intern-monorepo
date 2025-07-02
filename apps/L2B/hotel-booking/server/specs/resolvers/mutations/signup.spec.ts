import { GraphQLResolveInfo } from 'graphql';
import { addUser } from '../../../src/resolvers/mutations';
import { userModel } from '../../../src/models';
import bcrypt from 'bcrypt';

jest.mock('../../../src/models', () => ({
  userModel: {
    findOne: jest.fn(),
    create: jest.fn(),
  },
}));

jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('hashed_password'),
}));

describe('Create User', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a user', async () => {
    (userModel.findOne as jest.Mock).mockResolvedValue(null);
    (userModel.create as jest.Mock).mockResolvedValue({
      _id: '1',
      email: 'test@email.com',
      password: 'hashed_password',
    });

    const result = await addUser!({}, { email: 'test@email.com', password: '123' }, {}, {} as GraphQLResolveInfo);

    expect(result).toEqual({
      _id: '1',
      email: 'test@email.com',
      password: 'hashed_password',
    });

    expect(userModel.findOne).toHaveBeenCalledWith({ email: 'test@email.com' });
    expect(bcrypt.hash).toHaveBeenCalledWith('123', 10);
    expect(userModel.create).toHaveBeenCalledWith({
      email: 'test@email.com',
      password: 'hashed_password',
    });
  });

  it('should throw error if user already exists', async () => {
    (userModel.findOne as jest.Mock).mockResolvedValue({ _id: '1' });

    await expect(addUser!({}, { email: 'test@email.com', password: '123' }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('User already exists.');
  });
});
