import { mergeTypeDefs } from '@graphql-tools/merge';
import { helloDocumentsSchema } from './hello.schema';

export const typeDefs = mergeTypeDefs([helloDocumentsSchema]);
