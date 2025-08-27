import { userQueries } from '../../../../src/resolvers/queries/user/user.queries';
import { User } from '../../../../src/models/user.model';
import { ResolversParentTypes } from '../../../../src/generated';

describe('Get User Query', () => {

  test('Should get a specific user by ID', async () => {
    const existingUser = await User.findOne();
    if (!existingUser) {
      console.log('No users found in database');
      return;
    }

    const user = await userQueries.getUser({} as ResolversParentTypes['Query'], { _id: existingUser._id.toString() });
    
    expect(user).toBeDefined();
    expect(user?._id.toString()).toBe(existingUser._id.toString());
    expect(user?.email).toBe(existingUser.email);
    expect(user?.fullName).toBe(existingUser.fullName);
  });

  test('Should return null for non-existent user', async () => {
    const nonExistentId = '507f1f77bcf86cd799439011';
    const user = await userQueries.getUser({} as ResolversParentTypes['Query'], { _id: nonExistentId });
    
    expect(user).toBeNull();
  });
});
