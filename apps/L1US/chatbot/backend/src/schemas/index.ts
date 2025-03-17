import { mergeTypeDefs } from '@graphql-tools/merge';
import { typeDefs as CommonTypeDefs } from './common.schema';
import { UserTypeDefs } from './user.schema';
import { ConversationTypeDefs } from './conversation.schema';
import { MessageTypeDefs } from './message.schema';
import { LlamaTypeDefs } from './ollama.schema';

export const typeDefs = mergeTypeDefs([LlamaTypeDefs, CommonTypeDefs, UserTypeDefs, ConversationTypeDefs, MessageTypeDefs]);
