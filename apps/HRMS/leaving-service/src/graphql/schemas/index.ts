import { mergeTypeDefs } from '@graphql-tools/merge';
import { LeaveRequestTypeDefs } from './schema';
import { helloLeavingSchema } from './hello.schema';

export const typeDefs = mergeTypeDefs([LeaveRequestTypeDefs, helloLeavingSchema]);
