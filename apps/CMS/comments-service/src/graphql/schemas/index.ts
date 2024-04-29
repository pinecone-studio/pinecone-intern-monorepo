import { mergeTypeDefs } from '@graphql-tools/merge';
import { helloCommentsSchema } from './hello.schema';
import { commentsSchema } from './comment.schema';
import { replySchema } from './reply.schema';

export const typeDefs = mergeTypeDefs([helloCommentsSchema, commentsSchema, replySchema]);
