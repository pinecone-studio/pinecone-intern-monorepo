import { mergeTypeDefs } from '@graphql-tools/merge';

import { helloLeavingSchema } from './hello.schema';

export const typeDefs = mergeTypeDefs([helloLeavingSchema]);
