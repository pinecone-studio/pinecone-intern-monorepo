import { mergeTypeDefs } from '@graphql-tools/merge';
import { typeDefs as CommonTypeDefs } from './common.schema';
import { UserTypeDefs } from './user.schema';
import { ConversationTypeDefs } from './conversation.schema';
import { MessageTypeDefs } from './message.schema';

export const typeDefs = mergeTypeDefs([CommonTypeDefs, UserTypeDefs, ConversationTypeDefs, MessageTypeDefs]);
