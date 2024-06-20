import { helloMutationFromEmployeeDetailsService } from '@/graphql/resolvers/mutations';

describe('Hello Mutation', () => {
  it('Should call hello mutation', () => {
    expect(helloMutationFromEmployeeDetailsService()).toBeDefined();
  });
});
