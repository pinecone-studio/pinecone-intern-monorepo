import { GraphQLResolveInfo } from 'graphql';
import { getUser } from 'src/resolvers/queries';

jest.mock('src/models/user.model', () => ({
  UserModel: {
    findById: jest
      .fn()
      .mockReturnValueOnce({
        userId: '1',
        email: 'test@example.com',
        password: 'test1234',
        profile: null,
        bonusPoints: 0,
        role: 'user',
        phoneNumber: null,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      })
      .mockReturnValueOnce(null),
  },
}));

describe('get User', () => {
  it('should get a user', async () => {
    const result = await getUser?.({}, { input: { userId: '1' } }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      userId: '1',
      phoneNumber: null,
      email: 'test@example.com',
      password: 'test1234',
      profile: null,
      bonusPoints: 0,
      role: 'user',
      phoneNumber: null,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  it("should throw an error if the author doesn't exist", async () => {
    const testUserId = '2';
    try {
      await getUser?.({}, { input: { userId: testUserId } }, {}, {} as GraphQLResolveInfo);
      fail('Expected an error to be thrown');
    } catch (error: unknown) {
      expect(error).toBeInstanceOf(Error);
      if (error instanceof Error) {
        expect(error.message).toContain(`User with ${testUserId} Id is not found`);
      }
    }
  });
});
