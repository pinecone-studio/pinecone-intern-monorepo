import { PostModel } from '../../../../src/models';
import { getAllPosts } from '../../../../src/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';
jest.mock('apps/L1FG/instagram/backend/src/models');
describe('Get all posts', () => {
  it('SHould get all posts', async () => {
    if (!getAllPosts) {
      return;
    }
    (PostModel.find as jest.Mock).mockReturnValue({
      sort: jest.fn().mockResolvedValue([
        {
          _id: '1',
          postImage: ['ad'],
          caption: 'asdf',
          userId: 'fasf',
          carouselMediaCount: 1,
        },
      ]),
    });

    const result = await getAllPosts({}, {}, { userId: '23' }, {} as GraphQLResolveInfo);
    expect(result).toEqual([
      {
        _id: '1',
        postImage: ['ad'],
        caption: 'asdf',
        userId: 'fasf',
        carouselMediaCount: 1,
      },
    ]);
  });
  it('Should throw an unauthorized error', async () => {
    if (!getAllPosts) {
      return;
    }
    (PostModel.find as jest.Mock).mockReturnValue({
      sort: jest.fn().mockResolvedValue([
        {
          _id: '1',
          postImage: ['ad'],
          caption: 'asdf',
          userId: 'fasf',
          carouselMediaCount: 1,
        },
      ]),
    });
    await expect(getAllPosts({}, {}, { userId: null }, {} as GraphQLResolveInfo)).rejects.toThrow('Unauthorized');
  });
});
