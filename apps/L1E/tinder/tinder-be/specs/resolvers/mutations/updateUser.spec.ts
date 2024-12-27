import { GraphQLResolveInfo } from 'graphql';
import { updateUser } from '../../../src/resolvers/mutations';

const input = {
  email: 'aadaa@gmail.com',
  username: 'a',
  images: ['a'],
  age: 'a',
  bio: 'a',
  hobby: 'a',
  interest: 'a',
  job: 'a',
  profession: 'a',
};

jest.mock('../../../src/models/user/user.model.ts', () => ({
  userModel: {
    findById: jest.fn().mockReturnValueOnce({ _id: '1' }).mockReturnValueOnce(null),
    findByIdAndUpdate: jest.fn().mockReturnValueOnce({ _id: '1' }).mockReturnValueOnce(null),
  },
}));

describe('Update user', () => {
  it('Should update users information', async () => {
    const result = await updateUser!(
      {},
      { _id: '1', input },
      {
        req: undefined,
      },
      {} as GraphQLResolveInfo
    );

    expect(result).toEqual({
      _id: '1',
    });
  });

  it('Should return error when user not found', async () => {
    try {
      await updateUser!(
        {},
        { _id: '1', input },
        {
          req: undefined,
        },
        {} as GraphQLResolveInfo
      );
    } catch (error) {
      expect(error).toEqual(new Error('User not found'));
    }
  });
});
