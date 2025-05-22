import userResolvers from './mutations/user';
import imageResolvers from './mutations/image';
import * as Query from './queries';

export const resolvers = {
  Query,
  Mutation: {
    ...userResolvers.Mutation,
    ...imageResolvers.Mutation,
  },
  Upload: imageResolvers.Upload,
};
