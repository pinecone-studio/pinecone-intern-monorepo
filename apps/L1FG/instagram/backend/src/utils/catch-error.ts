import { GraphQLError } from 'graphql';
import { BadUserInputError, CreationError, FoundError, NotFoundError, UnauthenticatedError, UserFoundError, UserNotFoundError } from './error';
const errors = [UserFoundError, UserNotFoundError, CreationError, UnauthenticatedError, BadUserInputError, FoundError, NotFoundError];
export const catchError = (error: unknown): GraphQLError => {
  for (const Error of errors) {
    if (error instanceof Error) {
      return new GraphQLError(`${error.message}`, {
        extensions: {
          code: `${error.name}`,
        },
      });
    }
  }
  return new GraphQLError(`Server error`, {
    extensions: {
      code: `INTERNAL_SERVER_ERROR`,
    },
  });
};
