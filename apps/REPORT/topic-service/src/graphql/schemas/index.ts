import { mergeTypeDefs } from '@graphql-tools/merge';
import { helloTopicSchema } from './hello.schema';
import { topicsSchema } from './topic.schema';
export const typeDefs = mergeTypeDefs([helloTopicSchema, topicsSchema]);
