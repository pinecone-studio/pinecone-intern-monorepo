import { FollowerModel, UserModel } from 'apps/L1FG/instagram/backend/src/models';
import { getPreviewAllStories } from 'apps/L1FG/instagram/backend/src/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';
jest.mock('apps/L1FG/instagram/backend/src/utils/authenticate');
jest.mock('apps/L1FG/instagram/backend/src/resolvers/queries/story/get-user-story-info', () => ({
  getUserStoryInfo: jest.fn().mockResolvedValueOnce([
    {
      _id: '345',
      userName: 'niko',
    },
  ]),
}));
describe('get preview all stories', () => {
  it('Should throw Та нэвтэрнэ үү', async () => {
    if (!getPreviewAllStories) return;
    await expect(getPreviewAllStories({}, {}, { userId: null }, {} as GraphQLResolveInfo)).rejects.toThrow('Та нэвтэрнэ үү');
  });
  it('Should return preview stories', async () => {
    if (!getPreviewAllStories) return;
    const mockFindById = jest.fn().mockResolvedValueOnce({
      _id: '1234',
      userName: 'john',
    });
    const mockAggregate = jest.fn().mockResolvedValueOnce([
      {
        _id: '5678',
        userName: 'elwind',
      },
    ]);
    (UserModel.findById as jest.Mock) = mockFindById;
    (FollowerModel.aggregate as jest.Mock) = mockAggregate;
    const result = await getPreviewAllStories({}, {}, { userId: '67aa92d76fa444653ad6d4b5' }, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      storyTray: [
        {
          _id: '345',
          userName: 'niko',
        },
        {
          _id: '5678',
          userName: 'elwind',
        },
      ],
      viewer: {
        _id: '1234',
        userName: 'john',
      },
    });
  });
  it('Should catch error', async () => {
    if (!getPreviewAllStories) return;
    const mockFindById = jest.fn(() => {
      throw new Error('Алдаа');
    });
    (UserModel.findById as jest.Mock) = mockFindById;
    await expect(getPreviewAllStories({}, {}, { userId: '345' }, {} as GraphQLResolveInfo)).rejects.toThrow('Server error');
  });
});
