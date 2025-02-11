import { GraphQLError } from 'graphql';
export class UserNotFoundError extends GraphQLError {
  constructor(message: string) {
    super(message);
    this.name = 'USER_NOT_FOUND';
  }
}
export class UserFoundError extends GraphQLError {
  constructor(message: string) {
    super(message);
    this.name = 'USER_FOUND';
  }
}
export class CreationError extends GraphQLError {
  constructor(message: string) {
    super(message);
    this.name = 'CREATION_ERROR';
  }
}
export class UnauthenticatedError extends GraphQLError {
  constructor(message: string) {
    super(message);
    this.name = 'UNAUTHENTICATED';
  }
}

export class BadUserInputError extends GraphQLError {
  constructor(message: string) {
    super(message);
    this.name = 'BAD_USER_INPUT';
  }
}
export class FoundError extends GraphQLError {
  constructor(message: string) {
    super(message);
    this.name = 'FOUND_ERROR';
  }
}
export class NotFoundError extends GraphQLError {
  constructor(message: string) {
    super(message);
    this.name = 'NOT_FOUND_ERROR';
  }
}
