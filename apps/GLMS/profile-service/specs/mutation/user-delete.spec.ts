import glmsUserModel from '@/graphql/models/user.model';
import { deleteGlmsUser } from '@/graphql/resolvers/mutations';
import { GraphQLError, GraphQLResolveInfo } from 'graphql';

jest.mock('../../src/graphql/models/user.model', () => ({
  glmsUserModel: {
    findByIdAndDelete: jest.fn().mockResolvedValueOnce({
      _id: '1',
      firstName: 'testDelete',
      lastName: 'testDelete',
      email: 'delete@gmail.com',
      password: 'deletePassword',
      roles: 'STUDENT',
    }),
  },
}));

describe('Delete Glms User', () => {
  it('should delete a user', async () => {
    const mockGlmsUser = {
      _id: '1',
      firstName: 'testDelete',
      lastName: 'testDelete',
      email: 'delete@gmail.com',
      password: 'deletePassword',
      roles: 'STUDENT',
    };

    glmsUserModel.findByIdAndDelete = jest.fn().mockResolvedValueOnce(mockGlmsUser);
    const result = await deleteGlmsUser({}, { _id: '1' }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      _id: '1',
      firstName: 'testDelete',
      lastName: 'testDelete',
      email: 'delete@gmail.com',
      password: 'deletePassword',
      roles: 'STUDENT',
    });
  });

  it('should throw an error when a user is not found', async () => {
    try {
      await deleteGlmsUser({}, { _id: '' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new GraphQLError('Could not delete GLMS user'));
    }
  });

  it('should throw an error when an error occurs', async () => {
    try {
      await deleteGlmsUser({}, { _id: '1' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new GraphQLError('Could not delete GLMS user'));
    }
  });
});
