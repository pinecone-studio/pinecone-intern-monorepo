import { catchError } from '../../../src/utils';

describe('catchError', () => {
  it('should throw an error with the message from the Error instance', () => {
    const mockError = new Error('Something went wrong');

    expect(() => catchError(mockError)).toThrow('Something went wrong');
  });

  it('should throw a generic error if the error is not an instance of Error', () => {
    const mockNonError = 'This is a string, not an error';

    expect(() => catchError(mockNonError)).toThrow('An unexpected error occurred');
  });

  it('should throw a generic error if the error is null or undefined', () => {
    expect(() => catchError(null)).toThrow('An unexpected error occurred');
    expect(() => catchError(undefined)).toThrow('An unexpected error occurred');
  });
});
