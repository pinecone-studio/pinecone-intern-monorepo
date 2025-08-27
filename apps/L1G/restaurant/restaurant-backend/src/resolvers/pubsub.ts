// graphql/resolvers/pubsub.ts
import { PubSub } from 'graphql-subscriptions';

export const pubsub = new PubSub();
export const NOTIFICATION_RECEIVED = 'NOTIFICATION_RECEIVED';
