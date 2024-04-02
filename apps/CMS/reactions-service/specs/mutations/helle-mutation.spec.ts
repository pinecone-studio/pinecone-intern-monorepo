import { helloMutationFromReactionsService } from '@/graphql/resolvers/mutations';

describe('Hello Mutation', () => {
  it('Should call hello mutation', () => {
    expect(helloMutationFromReactionsService()).toBeDefined();
  });
});
