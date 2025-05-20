import { mergeTypeDefs } from '@graphql-tools/merge';
import { typeDefs as CommonTypeDefs } from './common.schema';
import { typeDefs as PostTypeDefs } from './post.schema';
import {typeDefs as FilterTypeDefs} from './filter.schema'
import { typeDefs as MeTypeDefs } from './me.schema';

export const typeDefs = mergeTypeDefs([CommonTypeDefs,PostTypeDefs,MeTypeDefs, FilterTypeDefs ]);

