import { MutationResolvers } from '../../../generated';
import { PostModel } from '../../../models';

export const createPost: MutationResolvers['createPost'] = async (_, { input }) => {
  const { postImage, caption, userId } = input;
  const carouselMediaCount = 2;

  //   try {
  const post = await PostModel.create({
    postImage,
    caption,
    userId,
    carouselMediaCount,
  });
  return post;
  //   } catch (error) {
  //     console.error('Error creating post:', error);
  //     throw new Error('Failed to create post. Please try again later.');
  //   }
};
