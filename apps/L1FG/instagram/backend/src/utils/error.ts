import { GraphQLError } from 'graphql';
export class UserNotFoundError extends GraphQLError {
  constructor(message: string) {
    super(message);
    this.name = 'USER_NOT_FOUND';
  }
}
export class CreationError extends GraphQLError {
  constructor(message: string) {
    super(message);
    this.name = 'CREATION_ERROR';
  }
}
export class UserFoundError extends GraphQLError {
  constructor(message: string) {
    super(message);
    this.name = 'USER_FOUND';
  }
}
export class UnauthenticatedError extends GraphQLError {
  constructor(message: string) {
    super(message);
    this.name = 'UNAUTHENTICATED';
  }
}
