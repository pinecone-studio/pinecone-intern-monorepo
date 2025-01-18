import { createPost } from 'apps/L1FG/instagram/backend/src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  PostModel: {
    create: jest.fn().mockReturnValue({
      _id: '1',
      postImage: ['image1'],
      caption: 'Hi',
      userId: '12',
      carouselMediaCount: 2,
      createdAt: '34',
    }),
  },
}));

describe('create post', () => {
  it('shoud be a post', async () => {
    if (!createPost) {
      return;
    }
    const input = {
      postImage: [''],
      userId: '',
      caption: '',
      carouselMediaCount: 1,
    };

    const result = await createPost({}, { input }, { userId: '12' }, {} as GraphQLResolveInfo);

    expect(result).toEqual({
      _id: '1',
      postImage: ['image1'],
      caption: 'Hi',
      userId: '12',
      carouselMediaCount: 2,
      createdAt: '34',
    });
  });
  it('Should throw an authorization error', async () => {
    if (!createPost) {
      return;
    }
    const input = {
      postImage: [''],
      userId: '',
      caption: '',
      carouselMediaCount: 0,
    };
    await expect(createPost({}, { input }, { userId: null }, {} as GraphQLResolveInfo)).rejects.toThrow('Unauthorized');
  });
  it('Should throw an carouselMediaCount error', async () => {
    if (!createPost) {
      return;
    }
    const input = {
      postImage: [''],
      userId: '',
      caption: '',
      carouselMediaCount: 11,
    };
    await expect(createPost({}, { input }, { userId: '12' }, {} as GraphQLResolveInfo)).rejects.toThrow('10 аас дээш зураг авч болохгүй');
  });
});
