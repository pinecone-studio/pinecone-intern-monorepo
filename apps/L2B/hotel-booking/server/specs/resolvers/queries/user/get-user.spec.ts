import { GraphQLResolveInfo } from 'graphql';
import { getUser } from '../../../../src/resolvers/queries';

jest.mock('../../../../src/models', () => ({
  userModel: {
    findById: jest.fn().mockReturnValueOnce({ _id: '1', email: 'test@email.com' }).mockReturnValueOnce(null),
  },
}));

describe('Get User', () => {
  it('should return a user', async () => {
    const result = await getUser!({}, { _id: '1' }, {}, {} as GraphQLResolveInfo);

    expect(result).toEqual({
      _id: '1',
      email: 'test@email.com',
    });
  });
});

it("should throw an error if the user doesn't exist", async () => {
  try {
    await getUser!({}, { _id: '1' }, {}, {} as GraphQLResolveInfo);
  } catch (error) {
    expect(error).toEqual(new Error('User not found'));
  }
});
