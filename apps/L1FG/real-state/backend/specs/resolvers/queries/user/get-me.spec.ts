import { getMe } from '../../../../src/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models/user.model.js', () => ({
  UserModel: {
    findById: jest.fn().mockResolvedValue(null).mockResolvedValue({ _id: '1' }),
  },
}));

describe('getMe', () => {
  it('1. should have to user id null', async () => {
    await expect(getMe!({}, {}, { userId: null }, {} as GraphQLResolveInfo)).rejects.toThrow('Зөвшөөрөлгүй');
  });
  it('2.should have to user id 1', async () => {
    await expect(getMe!({}, {}, { userId: '1' }, {} as GraphQLResolveInfo)).resolves.toEqual({ _id: '1' });
  });
});
