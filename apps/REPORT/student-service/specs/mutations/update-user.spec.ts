import { updateUser } from '@/graphql/resolvers/mutations';
import { GraphQLError } from 'graphql';

jest.mock('@/graphql/models/user.models', () => ({
  UserModel: {
    findByIdAndUpdate: jest
      .fn()
      .mockReturnValueOnce({
        _id: '1',
        firstName: 'Yesui',
        lastName: 'An',
        email: 'wrizz@gmail.com',
        roles: ['ADMIN'],
        password: 'lari2345',
      })
      .mockReturnValueOnce(null),
  },
}));

describe('Update User', () => {
  it('Should update a user', async () => {
    const result = await updateUser({}, { _id: '1', updateInput: { firstName: 'Yesui', lastName: 'An', email: 'wrizz@gmail.com', role: 'ADMIN', password: 'lari2345' } });
    expect(result).toEqual({
      _id: '1',
      firstName: 'Yesui',
      lastName: 'An',
      email: 'wrizz@gmail.com',
      roles: ['ADMIN'],
      password: 'lari2345',
    });
  });

  it('Should throw an error if the user does not exist', async () => {
    try {
      await updateUser({}, { _id: '8', updateInput: { firstName: 'Yesui', lastName: 'An', email: 'wrizz@gmail.com', role: 'ADMIN', password: 'lari2345' } });
    } catch (error) {
      expect(error).toEqual(new GraphQLError('database error'));
    }
  });

  it('Should throw an error if update failed', async () => {
    try {
      await updateUser({}, { _id: '1', updateInput: { firstName: 'Yesui', lastName: 'An', email: 'wrizz@gmail.com', role: 'ADMIN', password: 'lari2345' } });
    } catch (error) {
      expect(error).toEqual(new GraphQLError('database error'));
    }
  });
});
