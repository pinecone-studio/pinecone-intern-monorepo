import { GraphQLError } from 'graphql';
import { ApolloServerErrorCode } from '@apollo/server/errors';

export const errorTypes = {
  BAD_REQUEST: {
    errorCode: ApolloServerErrorCode.BAD_REQUEST,
    errorStatus: 400,
  },
  INTERVAL_SERVER_ERROR: {
    errorCode: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
    errorStatus: 500,
  },
  NOT_FOUND: {
    errorCode: 'NOT_FOUND',
    errorStatus: 404,
  },
  ALREADY_EXISTS: {
    errorCode: 'ALREADY_EXISTS',
    errorStatus: 400,
  },
  UNAUTHENTICATED: {
    errorCode: 'UNAUTHENTICATED',
    errorStatus: 401,
  },
  BAD_USER_INPUT: {
    errorcode: ApolloServerErrorCode.BAD_USER_INPUT,
    errorStatus: 400,
  },
};

export const graphqlErrorHandler = (errorMessage: { message: string }, errorType: { errorCode: string; errorStatus: number }) => {
  return new GraphQLError(errorMessage.message, {
    extensions: {
      code: errorType.errorCode,
      http: { status: errorType.errorStatus },
    },
  });
};
