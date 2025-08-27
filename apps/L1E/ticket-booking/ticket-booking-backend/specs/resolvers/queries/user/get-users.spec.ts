import { userQueries } from '../../../../src/resolvers/queries/user/user.queries';
import { ResolversParentTypes } from '../../../../src/generated';

describe('Get Users Query', () => {

  test('Should get all users from database with correct structure', async () => {
    const users = await userQueries.getUsers({} as ResolversParentTypes['Query']);
    
    expect(Array.isArray(users)).toBe(true);
    expect(users.length).toBeGreaterThanOrEqual(0);
    
    if (users.length > 0) {
      const user = users[0];
      expect(user).toHaveProperty('_id');
      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('fullName');
      expect(user).toHaveProperty('password');
      expect(user).toHaveProperty('role');
      expect(user).toHaveProperty('createdAt');
      expect(user).toHaveProperty('updatedAt');
    }
  });

  test('Should get users sorted by creation date', async () => {
    const users = await userQueries.getUsers({} as ResolversParentTypes['Query']);
    
    if (users.length > 1) {
      for (let i = 1; i < users.length; i++) {
        expect(users[i].createdAt.getTime()).toBeGreaterThanOrEqual(
          users[i-1].createdAt.getTime()
        );
      }
    }
  });
});
