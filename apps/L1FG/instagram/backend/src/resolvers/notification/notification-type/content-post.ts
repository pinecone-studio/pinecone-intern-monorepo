import { Post } from '../../../generated';
import { PostModel } from '../../../models';

export const contentPost = async ({ contentPostId }: { contentPostId: string | null }, _: unknown, __: unknown) => {
  if (!contentPostId) {
    return null;
  }

  const foundPost: Post | null = await PostModel.findById({ _id: contentPostId });
  
  if (!foundPost) {
    throw new Error('not found post');
  }
  const image = foundPost.postImage[0];

  return image;
};
