import { mergeTypeDefs } from '@graphql-tools/merge';
import { helloCommentsSchema } from './hello.schema';

export const typeDefs = mergeTypeDefs([helloCommentsSchema]);
