import { deleteUser } from '@/graphql/resolvers/mutations';
import { GraphQLError, GraphQLResolveInfo } from 'graphql';
import { UserModel } from '../../src/graphql/models/user.models';
import mongoose from 'mongoose';

jest.mock('@/graphql/models/user.models', () => ({
  UserModel: {
    findByIdAndDelete: jest.fn().mockReturnValueOnce({
      _id: '1',
      firstName: 'Ghandi',
      lastName: 'Mhatma',
      email: 'india@numba.wan',
      password: 'WarudoPeas',
      role: 'ADMIN',
    }),
  },
}));

describe('User Delete function', () => {
  it('should delete the specific user', async () => {
    const mockUser = {
      _id: '1',
      firstName: 'Ghandi',
      lastName: 'Mhatma',
      email: 'india@numba.wan',
      password: 'WarudoPeas',
      role: 'ADMIN',
    };

    UserModel.findByIdAndDelete.mockResolvedValue(mockUser);

    const id = { _id: '1' };

    const result = await deleteUser!({}, id, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual(mockUser);
  });

  it('should throw an error when a user is not found', async () => {
    try {
      await deleteUser({}, { _id: '' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new GraphQLError('Internal System Error'));
    }
  });

  it('should throw an error when an error occurs', async () => {
    try {
      await deleteUser({}, { _id: '1' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new GraphQLError('Internal System Error'));
    }
  });
});
