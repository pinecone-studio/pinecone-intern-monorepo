import { signUp } from '../../src/graphql/resolvers/mutations/sign-up';
import { UserModel } from '@/model';
import { GraphQLError, GraphQLResolveInfo } from 'graphql';

const input = {
  email: 'mockEmail@gmail.com',
  phoneNumber: '99999999',
  password: '12345678',
};

jest.mock('@/model', () => ({
  UserModel: {
    findOne: jest.fn(),
    create: jest.fn(),
  },
}));

describe('Sign up', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a user successfully', async () => {
    (UserModel.findOne as jest.Mock).mockResolvedValueOnce(null);
    (UserModel.create as jest.Mock).mockResolvedValueOnce({});

    const result = await signUp!({}, { input }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      message: 'Хэрэглэгч амжилттай үүслээ',
    });
    expect(UserModel.findOne).toHaveBeenCalledWith({
      $or: [{ email: input.email }, { phoneNumber: input.phoneNumber }],
    });
    expect(UserModel.create).toHaveBeenCalledWith(input);
  });

  it('should throw an error if user already exists', async () => {
    (UserModel.findOne as jest.Mock).mockResolvedValueOnce({ _id: 'existingUserId' });

    await expect(signUp!({}, { input }, {}, {} as GraphQLResolveInfo)).rejects.toThrow(
      new GraphQLError('Алдаа гарлаа')
    );
    expect(UserModel.findOne).toHaveBeenCalledWith({
      $or: [{ email: input.email }, { phoneNumber: input.phoneNumber }],
    });
    expect(UserModel.create).not.toHaveBeenCalled();
  });

  it('should throw a generic error if user creation fails', async () => {
    (UserModel.findOne as jest.Mock).mockResolvedValueOnce(null);
    (UserModel.create as jest.Mock).mockRejectedValueOnce(new Error('Creation failed'));

    await expect(signUp!({}, { input }, {}, {} as GraphQLResolveInfo)).rejects.toThrow(
      new GraphQLError('Алдаа гарлаа')
    );
    expect(UserModel.findOne).toHaveBeenCalledWith({
      $or: [{ email: input.email }, { phoneNumber: input.phoneNumber }],
    });
    expect(UserModel.create).toHaveBeenCalledWith(input);
  });

  it('should throw a generic error on unexpected errors', async () => {
    (UserModel.findOne as jest.Mock).mockRejectedValueOnce(new Error('Unexpected error'));

    await expect(signUp!({}, { input }, {}, {} as GraphQLResolveInfo)).rejects.toThrow(
      new GraphQLError('Алдаа гарлаа')
    );
    expect(UserModel.findOne).toHaveBeenCalledWith({
      $or: [{ email: input.email }, { phoneNumber: input.phoneNumber }],
    });
    expect(UserModel.create).not.toHaveBeenCalled();
  });
});
