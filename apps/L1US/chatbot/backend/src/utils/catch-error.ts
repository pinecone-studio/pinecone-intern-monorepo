export const catchError = (error: unknown) => {
  if (error instanceof Error) {
    throw new Error(error.message);
  }
  throw new Error('An unexpected error occurred');
};
