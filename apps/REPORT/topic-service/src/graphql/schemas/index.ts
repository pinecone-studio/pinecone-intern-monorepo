import { mergeTypeDefs } from '@graphql-tools/merge';
import { helloTopicSchema } from './hello.schema';

export const typeDefs = mergeTypeDefs([helloTopicSchema]);
