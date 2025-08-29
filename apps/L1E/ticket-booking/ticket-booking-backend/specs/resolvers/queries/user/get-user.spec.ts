import { userQueries } from '../../../../src/resolvers/queries/user/user.queries';
import { userMutations } from '../../../../src/resolvers/mutations/user/user.mutation';
import { User } from '../../../../src/models/user.model';
import { ResolversParentTypes } from '../../../../src/generated';
import type { UserType } from '../../../../src/models/user.model';

describe('Get User Query', () => {
  let testUser: UserType;

  beforeEach(async () => {
    const userData = {
      email: `test${Date.now()}${Math.random()}@example.com`,
      fullName: 'Test User',
      password: 'password123',
      role: 'USER',
      phone: '1234567890'
    };
    testUser = await userMutations.createUser({} as ResolversParentTypes['Mutation'], userData);
  });

  afterEach(async () => {
    if (testUser?._id) {
      await User.deleteOne({ _id: testUser._id });
    }
  });

  test('Should get user by ID successfully', async () => {
    const queryArgs = {
      _id: testUser._id.toString()
    };

    const retrievedUser = await userQueries.getUser({} as ResolversParentTypes['Query'], queryArgs);
    
    expect(retrievedUser).toBeDefined();
    expect(retrievedUser._id.toString()).toBe(testUser._id.toString());
    expect(retrievedUser.email).toBe(testUser.email);
    expect(retrievedUser.fullName).toBe(testUser.fullName);
    expect(retrievedUser.role).toBe(testUser.role);
    expect(retrievedUser.phone).toBe(testUser.phone);
  });

  test('Should return null for non-existent user', async () => {
    const queryArgs = {
      _id: '507f1f77bcf86cd799439011'
    };

    const retrievedUser = await userQueries.getUser({} as ResolversParentTypes['Query'], queryArgs);
    
    expect(retrievedUser).toBeNull();
  });

  test('Should handle invalid ObjectId format', async () => {
    const queryArgs = {
      _id: 'invalid-id-format'
    };

    const retrievedUser = await userQueries.getUser({} as ResolversParentTypes['Query'], queryArgs);
    
    expect(retrievedUser).toBeNull();
  });

  test('Should retrieve admin user successfully', async () => {
    const adminData = {
      email: `admin${Date.now()}${Math.random()}@example.com`,
      fullName: 'Admin User',
      password: 'password123',
      role: 'ADMIN',
      phone: '1234567890'
    };
    const adminUser = await userMutations.createUser({} as ResolversParentTypes['Mutation'], adminData);

    const queryArgs = {
      _id: adminUser._id.toString()
    };

    const retrievedUser = await userQueries.getUser({} as ResolversParentTypes['Query'], queryArgs);
    
    expect(retrievedUser).toBeDefined();
    expect(retrievedUser.role).toBe('ADMIN');
    expect(retrievedUser._id.toString()).toBe(adminUser._id.toString());

    await User.deleteOne({ _id: adminUser._id });
  });

  test('Should retrieve user without phone number', async () => {
    const userWithoutPhoneData = {
      email: `nophone${Date.now()}${Math.random()}@example.com`,
      fullName: 'No Phone User',
      password: 'password123',
      role: 'USER'
    };
    const userWithoutPhone = await userMutations.createUser({} as ResolversParentTypes['Mutation'], userWithoutPhoneData);

    const queryArgs = {
      _id: userWithoutPhone._id.toString()
    };

    const retrievedUser = await userQueries.getUser({} as ResolversParentTypes['Query'], queryArgs);
    
    expect(retrievedUser).toBeDefined();
    if (retrievedUser) {
      expect(retrievedUser.phone).toBeUndefined();
      expect(retrievedUser._id.toString()).toBe(userWithoutPhone._id.toString());
    }

    await User.deleteOne({ _id: userWithoutPhone._id });
  });

  test('Should return user with all expected fields', async () => {
    const queryArgs = {
      _id: testUser._id.toString()
    };

    const retrievedUser = await userQueries.getUser({} as ResolversParentTypes['Query'], queryArgs);
    
    expect(retrievedUser).toHaveProperty('_id');
    expect(retrievedUser).toHaveProperty('email');
    expect(retrievedUser).toHaveProperty('fullName');
    expect(retrievedUser).toHaveProperty('role');
    expect(retrievedUser).toHaveProperty('phone');
    expect(retrievedUser).toHaveProperty('createdAt');
    expect(retrievedUser).toHaveProperty('updatedAt');
  });

  test('Should handle empty string ID', async () => {
    const queryArgs = {
      _id: ''
    };

    const retrievedUser = await userQueries.getUser({} as ResolversParentTypes['Query'], queryArgs);
    
    expect(retrievedUser).toBeNull();
  });

  test('Should handle edge cases and errors', async () => {
    const nullIdResult = await userQueries.getUser({} as ResolversParentTypes['Query'], { _id: null as unknown as string });
    expect(nullIdResult).toBeNull();

    const originalFindById = User.findById;
    User.findById = jest.fn().mockRejectedValue(new Error('Database connection failed'));
    
    const dbErrorResult = await userQueries.getUser({} as ResolversParentTypes['Query'], { _id: '507f1f77bcf86cd799439011' });
    expect(dbErrorResult).toBeNull();
    
    User.findById = originalFindById;
  });
});
