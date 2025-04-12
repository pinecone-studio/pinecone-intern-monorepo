import mongoose from 'mongoose';
import { getUser } from '../../../../src/resolvers/queries';
import { UserModel } from '../../../../src/models';
import { GraphQLResolveInfo } from 'graphql';

const validUserId = new mongoose.Types.ObjectId().toHexString();
const invalidUserId = 'invalid-id';

const mockUser = {
  _id: validUserId,
  name: 'John Doe',
  email: 'johndoe@example.com',
  createdAt: new Date(),
  updatedAt: new Date(),
};

jest.mock('../../../../src/models', () => ({
  UserModel: {
    findById: jest.fn(),
  },
}));

describe('getUser', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw an error for invalid userId format', async () => {
    await expect(getUser!({}, { userId: invalidUserId }, {} as any, {} as GraphQLResolveInfo))
      .rejects.toThrow('Invalid user ID');
  });

  it('should return user data when given a valid userId', async () => {
    (UserModel.findById as jest.Mock).mockResolvedValue(mockUser);

    const result = await getUser!({}, { userId: validUserId }, {} as any, {} as GraphQLResolveInfo);

    expect(UserModel.findById).toHaveBeenCalledWith(validUserId);
    expect(result).toEqual(mockUser);
  });

  it('should throw an error if user is not found', async () => {
    (UserModel.findById as jest.Mock).mockResolvedValue(null);

    await expect(getUser!({}, { userId: validUserId }, {} as any, {} as GraphQLResolveInfo))
      .rejects.toThrow('User not found');
  });

  it('should throw an error if fetching user fails', async () => {
    (UserModel.findById as jest.Mock).mockRejectedValue(new Error('Database error'));

    await expect(getUser!({}, { userId: validUserId }, {} as any, {} as GraphQLResolveInfo))
      .rejects.toThrow('Database error');
  });
});
