import { GraphQLResolveInfo } from 'graphql';
import { signIn } from 'src/resolvers/mutations';
import { UserModel } from 'src/models/user.model';
import bcrypt from 'bcryptjs';

jest.mock('bcryptjs', () => ({
  compare: jest.fn().mockResolvedValue(true),
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockReturnValue('test1234'),
}));

jest.mock('src/models/user.model', () => ({
  UserModel: {
    findOne: jest.fn().mockReturnValue({
      userId: '1',
      username: 'Test',
      email: 'test@example.com',
      password: 'hashedPassword',
    }),
  },
}));

describe('signIn', () => {
  it('should sign in', async () => {
    const result = await signIn?.({}, { input: { email: 'test@example.com', password: 'hashedPassword' } }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      token: 'test1234',
      user: {
        userId: '1',
        username: 'Test',
        email: 'test@example.com',
        password: 'hashedPassword',
      },
    });
  });

  it('should throw an error if the user doesnt exist', async () => {
    (UserModel.findOne as jest.Mock).mockResolvedValueOnce(null);

    await expect(signIn?.({}, { input: { email: 'nonexistent@example.com', password: 'anypassword' } }, {}, {} as GraphQLResolveInfo)).rejects.toThrow(
      'User with nonexistent@example.com email is not found'
    );
  });

  it('should throw an error if the password is invalid', async () => {
    const mockUser = {
      userId: '1',
      username: 'Test',
      email: 'test@example.com',
      password: 'hashedPassword',
    };

    (UserModel.findOne as jest.Mock).mockResolvedValue(mockUser);

    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    await expect(signIn?.({}, { input: { email: 'test@example.com', password: 'wrongpassword' } }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('Invalid password');
  });
});
