import { savedModel } from 'apps/L1AB/instagram/instagram-backend/src/models';
import { createSave } from '../../../../src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  savedModel: {
    findOne: jest
      .fn()
      .mockResolvedValueOnce({
        _id: '11',
        userId: '6736de8f281cb64d91e94b7b',
        postId: '673da5414a0c0fa573e0d256',
        createdAt: '11/11',
      })
      .mockResolvedValueOnce(null),
    deleteOne: jest.fn().mockResolvedValue('Success'),
    create: jest.fn().mockResolvedValue('Success'),
  },
}));
describe('create save', () => {
  it('should unsave a post if it is already saved', async () => {
    const res = await createSave!({}, { userId: '6736de8f281cb64d91e94b7b', postId: '673da5414a0c0fa573e0d256' }, {}, {} as GraphQLResolveInfo);

    expect(res).toEqual({ message: 'Unsaved post successfully' });
  });
  it('should save a post if it is not already saved', async () => {
    jest.setTimeout(10000);
    const res = await createSave!({}, { userId: '6736de8f281cb64d91e94b7b', postId: '673da5414a0c0fa573e0d256' }, {}, {} as GraphQLResolveInfo);

    expect(res).toEqual({ message: 'Saved post successfully' });
  });
});
