import { UserModel } from 'apps/L1FG/instagram/backend/src/models';
import { getOneStory } from 'apps/L1FG/instagram/backend/src/resolvers/queries/story/get-one-story';
/*eslint-disable*/
import { authenticate } from 'apps/L1FG/instagram/backend/src/utils/authenticate';
import { GraphQLResolveInfo } from 'graphql';
jest.mock('apps/L1FG/instagram/backend/src/utils/authenticate');
jest.mock('apps/L1FG/instagram/backend/src/models');
describe('Get one story', () => {
  it('Should throw authenticate error', async () => {
    if (!getOneStory) return;
    (authenticate as jest.Mock) = jest.fn(() => {
      throw new Error('Та нэвтэрнэ үү');
    });
    await expect(getOneStory({}, { userName: 'john' }, { userId: '6788c5e84282c4b2590a14b2' }, {} as GraphQLResolveInfo)).rejects.toThrow('Та нэвтэрнэ үү');
  });
  it('Should throw Хэрэглэгч олдсонгүй', async () => {
    if (!getOneStory) return;
    (authenticate as jest.Mock) = jest.fn();
    (UserModel.findOne as jest.Mock) = jest.fn().mockResolvedValueOnce(null);
    await expect(getOneStory({}, { userName: 'john' }, { userId: '6788c5e84282c4b2590a14b2' }, {} as GraphQLResolveInfo)).rejects.toThrow('Хэрэглэгч олдсонгүй');
  });
  it('Should successfully return result', async () => {
    if (!getOneStory) return;
    (authenticate as jest.Mock) = jest.fn();
    (UserModel.findOne as jest.Mock) = jest.fn().mockResolvedValueOnce({
      _id: '6788c5e84282c4b2590a14b2',
    });
    (UserModel.aggregate as jest.Mock) = jest.fn().mockResolvedValueOnce([
      {
        _id: '6788c5e84282c4b2590a14b2',
        userName: 'john',
      },
    ]);
    const result = await getOneStory({}, { userName: 'john' }, { userId: '6788c5e84282c4b2590a14b2' }, {} as GraphQLResolveInfo);
    expect(result).toEqual([
      {
        _id: '6788c5e84282c4b2590a14b2',
        userName: 'john',
      },
    ]);
  });
  it('Should catch error', async () => {
    if (!getOneStory) return;
    (authenticate as jest.Mock) = jest.fn();
    (UserModel.findOne as jest.Mock) = jest.fn().mockResolvedValueOnce({
      _id: '6788c5e84282c4b2590a14b2',
    });
    (UserModel.aggregate as jest.Mock) = jest.fn(() => {
      throw new Error('error');
    });
    await expect(getOneStory({}, { userName: 'john' }, { userId: '6788c5e84282c4b2590a14b2' }, {} as GraphQLResolveInfo)).rejects.toThrow('Server error');
  });
});
