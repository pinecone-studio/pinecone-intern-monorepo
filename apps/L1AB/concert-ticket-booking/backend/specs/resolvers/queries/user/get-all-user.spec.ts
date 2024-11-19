import { getAllUsers } from '../../../../src/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  userModel: {
    find: jest
      .fn()
      .mockResolvedValueOnce([{ _id: '1', name: 'tur', email: '123', password: 'tur', phone: '991010', role: 'user' }])
      .mockResolvedValueOnce([]),
  },
}));
describe('getAllusers', () => {
  it('should return all users', async () => {
    const users = await getAllUsers!({}, {}, { _id: '1', name: 'tur', email: '123', password: 'tur', phone: '991010', role: 'user' }, {} as GraphQLResolveInfo);
    expect(users).toEqual([{ _id: '1', name: 'tur', email: '123', password: 'tur', phone: '991010', role: 'user' }]);
  });

  it('should return an empty array if no users', async () => {
    const users = await getAllUsers!({}, {}, { _id: '1', name: 'tur', email: '123', password: 'tur', phone: '991010', role: 'user' }, {} as GraphQLResolveInfo);
    expect(users).toEqual([]);
  });
});
