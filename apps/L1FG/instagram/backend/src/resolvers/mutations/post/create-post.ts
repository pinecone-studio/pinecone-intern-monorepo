import { MutationResolvers } from '../../../generated';
import { PostModel } from '../../../models';

export const createPost: MutationResolvers['createPost'] = async (_, { input }, { userId }) => {
  if (!userId) throw new Error('Unauthorized');
  const { postImage, caption } = input;
  const carouselMediaCount = postImage.length;
  if (carouselMediaCount > 10) throw new Error('10 аас дээш зураг авч болохгүй');
  const post = await PostModel.create({
    postImage,
    caption,
    userId,
    carouselMediaCount,
  });
  return post;
};
