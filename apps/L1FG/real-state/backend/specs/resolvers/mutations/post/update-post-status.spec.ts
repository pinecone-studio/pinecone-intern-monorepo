import { updatePostStatus } from '../../../../src/resolvers/mutations/post/update-post-status';
import { updatePost } from '../../../../src/resolvers/mutations/post/update-post';
import { Post } from '../../../../src/models/post-model';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models/post-model');

describe('updatePostStatus', () => {
  it('should update the status of a post', async () => {
    const _id = '123';
    const input = { status: 'published' };
    const updatedPost = { _id, status: 'published' };

    (Post.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedPost);

    const result = await updatePostStatus({}, { input, _id }, { userId: null }, {} as GraphQLResolveInfo);

    expect(Post.findByIdAndUpdate).toHaveBeenCalledWith(_id, { status: 'published' }, { new: true });
    expect(result).toEqual(updatedPost);
  });

  it('should return null if post not found', async () => {
    const _id = '123';
    const input = { status: 'published' };

    (Post.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

    const result = await updatePostStatus({}, { input, _id }, { userId: null }, {} as GraphQLResolveInfo);

    expect(Post.findByIdAndUpdate).toHaveBeenCalledWith(_id, { status: 'published' }, { new: true });
    expect(result).toBeNull();
  });
});

describe('updatePost', () => {
  it('should update a post with given input', async () => {
    const _id = '123';
    const input = { title: 'New Title' };
    const updatedPost = { _id, title: 'New Title' };

    (Post.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedPost);
    const result = await updatePost({}, { input, _id }, { userId: null }, {} as GraphQLResolveInfo);

    expect(result).toEqual(updatedPost);

    expect(Post.findByIdAndUpdate).toHaveBeenCalledWith(_id, input, { new: true });
  });

  it('should return null if post not found', async () => {
    const _id = '123';
    const input = { title: 'New Title' };

    (Post.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

    expect(Post.findByIdAndUpdate).toHaveBeenCalledWith(_id, input, { new: true });
  });
});
