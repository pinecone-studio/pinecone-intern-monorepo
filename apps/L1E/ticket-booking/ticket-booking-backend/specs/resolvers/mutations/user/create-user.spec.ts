import { userMutations } from '../../../../src/resolvers/mutations/user/user.mutation';
import { User } from '../../../../src/models/user.model';
import { ResolversParentTypes } from '../../../../src/generated';

describe('Create User Mutation', () => {

  test('Should create a new user successfully', async () => {
    const userData = {
      email: `test${Date.now()}${Math.random()}@example.com`,
      fullName: 'Test User',
      password: 'password123',
      role: 'USER',
      phone: '1234567890'
    };

    const createdUser = await userMutations.createUser({} as ResolversParentTypes['Mutation'], userData);
    
    expect(createdUser).toBeDefined();
    expect(createdUser.email).toBe(userData.email);
    expect(createdUser.fullName).toBe(userData.fullName);
    expect(createdUser.role).toBe(userData.role);
    expect(createdUser.phone).toBe(userData.phone);
    expect(createdUser._id).toBeDefined();
    expect(createdUser.createdAt).toBeDefined();
    expect(createdUser.updatedAt).toBeDefined();

    await User.deleteOne({ _id: createdUser._id });
  });

  test('Should create user with default role when not provided', async () => {
    const userData = {
      email: `test${Date.now()}${Math.random()}@example.com`,
      fullName: 'Test User',
      password: 'password123',
      phone: '1234567890'
    };

    const createdUser = await userMutations.createUser({} as ResolversParentTypes['Mutation'], userData);
    
    expect(createdUser.role).toBe('USER');
    expect(createdUser.email).toBe(userData.email);

    await User.deleteOne({ _id: createdUser._id });
  });

  test('Should throw error for duplicate email', async () => {
    const userData = {
      email: `test${Date.now()}${Math.random()}@example.com`,
      fullName: 'Test User',
      password: 'password123',
      role: 'USER'
    };

    const firstUser = await userMutations.createUser({} as ResolversParentTypes['Mutation'], userData);
    
    await expect(userMutations.createUser({} as ResolversParentTypes['Mutation'], userData)).rejects.toThrow('User with this email already exists');

    await User.deleteOne({ _id: firstUser._id });
  });
});
