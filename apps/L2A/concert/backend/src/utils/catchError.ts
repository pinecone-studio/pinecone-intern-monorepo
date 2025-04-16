import { GraphQLError } from 'graphql';

export const catchError = (error: unknown) => {
  if (error instanceof Error) {
    throw new GraphQLError(error.message);
  }
  throw new GraphQLError('Серверийн алдаа');
};
