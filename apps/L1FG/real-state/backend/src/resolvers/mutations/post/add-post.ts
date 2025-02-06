import { MutationResolvers } from '../../../generated';
import { Post } from '../../../models/post-model';

export const addPost: MutationResolvers['addPost'] = async (__, { input }) => {
  const { title, description, price, status, updatedAt, propertyOwnerId, propertyDetail, createdAt } = input;

  const post = await Post.create({ title, description, price, propertyOwnerId, propertyDetail, status, createdAt, updatedAt });

  return post;
};
