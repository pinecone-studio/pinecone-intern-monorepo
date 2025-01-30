import { PostModel } from 'apps/L1FG/instagram/backend/src/models';
import { addPostToDatabase } from 'apps/L1FG/instagram/backend/src/resolvers/mutations/post/create-post-utils';

jest.mock('apps/L1FG/instagram/backend/src/models');
describe('Create post', () => {
  it('Should throw failed to create a post error', async () => {
    (PostModel.create as jest.Mock).mockResolvedValue(null);
    await expect(
      addPostToDatabase('adf', {
        caption: 'hi how',
        postImage: ['image'],
      })
    ).rejects.toThrow('Failed to create a post');
  });
  it('Should create a post to database', async () => {
    (PostModel.create as jest.Mock).mockResolvedValue({
      _id: '6799df7cf49554350497415b',
      caption: 'hi',
      carouselMediaCount: 2,
      createdAt: '2024-10-24',
      postImage: ['image', 'image'],
      userId: '234',
    });
    const result = await addPostToDatabase('adf', {
      caption: 'hi how',
      postImage: ['image'],
    });
    expect(result).toEqual({
      _id: '6799df7cf49554350497415b',
      caption: 'hi',
      carouselMediaCount: 2,
      createdAt: '2024-10-24',
      postImage: ['image', 'image'],
      userId: '234',
    });
  });
});
