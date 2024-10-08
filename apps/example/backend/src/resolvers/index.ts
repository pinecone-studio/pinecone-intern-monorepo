// import * as Mutation from './mutations';
import { getProducts } from './queries';

export const resolvers = {
  Query: {
    getProducts: getProducts,
  },
};
