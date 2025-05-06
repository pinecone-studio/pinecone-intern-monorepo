export const ProductError = (error: unknown, notFoundMessage: string): never => {
    if (error instanceof Error && error.message === notFoundMessage) {
      throw error;
    }
    throw new Error('Product service error');
  };
