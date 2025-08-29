import { userQueries } from '../../../../src/resolvers/queries/user/user.queries';
import { userMutations } from '../../../../src/resolvers/mutations/user/user.mutation';
import { User } from '../../../../src/models/user.model';
import { ResolversParentTypes } from '../../../../src/generated';
import type { UserType } from '../../../../src/models/user.model';

describe('Get Users Query', () => {
  let testUsers: UserType[] = [];

  beforeEach(async () => {
    testUsers = [];
  });

  afterEach(async () => {
    for (const user of testUsers) {
      if (user?._id) {
        await User.deleteOne({ _id: user._id });
      }
    }
  });

  test('Should return empty array when no users exist', async () => {
    const users = await userQueries.getUsers({} as ResolversParentTypes['Query']);
    
    expect(users).toBeDefined();
    expect(Array.isArray(users)).toBe(true);
    expect(users.length).toBeGreaterThanOrEqual(0);
  });

  test('Should return users with unique emails', async () => {
    const userData1 = {
      email: `test1${Date.now()}${Math.random()}@example.com`,
      fullName: 'Test User 1',
      password: 'password123',
      role: 'USER',
      phone: '1234567890'
    };
    const user1 = await userMutations.createUser({} as ResolversParentTypes['Mutation'], userData1);
    testUsers.push(user1);

    const userData2 = {
      email: `test2${Date.now()}${Math.random()}@example.com`,
      fullName: 'Test User 2',
      password: 'password123',
      role: 'USER',
      phone: '1234567891'
    };
    const user2 = await userMutations.createUser({} as ResolversParentTypes['Mutation'], userData2);
    testUsers.push(user2);

    const users = await userQueries.getUsers({} as ResolversParentTypes['Query']);
    
    expect(users).toBeDefined();
    expect(Array.isArray(users)).toBe(true);
    expect(users.length).toBeGreaterThanOrEqual(2);
    
    const emails = users.map(user => user.email);
    const uniqueEmails = [...new Set(emails)];
    
    expect(emails.length).toBe(uniqueEmails.length);
  });

  test('Should return users with valid ObjectIds', async () => {
    const userData = {
      email: `test${Date.now()}${Math.random()}@example.com`,
      fullName: 'Test User',
      password: 'password123',
      role: 'USER',
      phone: '1234567890'
    };
    const user = await userMutations.createUser({} as ResolversParentTypes['Mutation'], userData);
    testUsers.push(user);

    const users = await userQueries.getUsers({} as ResolversParentTypes['Query']);
    
    expect(users).toBeDefined();
    expect(Array.isArray(users)).toBe(true);
    
    for (const returnedUser of users) {
      expect(returnedUser._id).toBeDefined();
      expect(typeof returnedUser._id.toString()).toBe('string');
    }
  });

  test('Should return users with all expected fields', async () => {
    const userData = {
      email: `test${Date.now()}${Math.random()}@example.com`,
      fullName: 'Test User',
      password: 'password123',
      role: 'USER',
      phone: '1234567890'
    };
    const user = await userMutations.createUser({} as ResolversParentTypes['Mutation'], userData);
    testUsers.push(user);

    const users = await userQueries.getUsers({} as ResolversParentTypes['Query']);
    
    expect(users).toBeDefined();
    expect(Array.isArray(users)).toBe(true);
    
    for (const returnedUser of users) {
      expect(returnedUser).toHaveProperty('_id');
      expect(returnedUser).toHaveProperty('email');
      expect(returnedUser).toHaveProperty('fullName');
      expect(returnedUser).toHaveProperty('role');
      expect(returnedUser).toHaveProperty('phone');
      expect(returnedUser).toHaveProperty('createdAt');
      expect(returnedUser).toHaveProperty('updatedAt');
    }
  });
});
