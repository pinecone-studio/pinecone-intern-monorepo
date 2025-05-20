import { mergeTypeDefs } from '@graphql-tools/merge';
import { userTypeDefs } from './user.schema';

import { queryTypeDefs } from './query.schema';

export const typeDefs = mergeTypeDefs([userTypeDefs, queryTypeDefs]);
