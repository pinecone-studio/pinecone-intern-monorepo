import { MutationResolvers } from '../../generated';

export const crawl: MutationResolvers['crawl'] = (_, { input }) => {
  const { url } = input;

  return { url };
};