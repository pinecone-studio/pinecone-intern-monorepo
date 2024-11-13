import { updateUser } from '../../../../src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

const input = { fullname: 'boldoo', username: 'bold', bio: 'hi', gender: 'male', profilePicture: 'image' };

jest.mock('../../../../src/models', () => ({
  userModel: {
    findByIdAndUpdate: jest.fn().mockReturnValueOnce({ _id: '1' }).mockReturnValueOnce(null),
  },
}));

describe('Update User', () => {
  it('should updat users information', async () => {
    const result = await updateUser!({}, { _id: '1', input }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      _id: '1',
    });
  });

  it('Should return error when user not found', async () => {
    try {
      await updateUser!({}, { _id: '1', input }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('User not found'));
    }
  });
});
