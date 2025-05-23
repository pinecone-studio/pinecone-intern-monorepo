import { mergeTypeDefs } from '@graphql-tools/merge';
import { userTypeDefs } from './user.schema';

import { queryTypeDefs } from './query.schema';
import { profileTypeDefs } from './profile.schema';

export const typeDefs = mergeTypeDefs([userTypeDefs, queryTypeDefs, profileTypeDefs]);
