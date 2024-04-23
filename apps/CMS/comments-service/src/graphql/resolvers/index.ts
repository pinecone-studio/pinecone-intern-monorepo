import * as Mutation from './mutations';
import * as Query from './queries';

export const resolvers: unknown = {
  Query: { ...Query },
  Mutation: { ...Mutation },
};
