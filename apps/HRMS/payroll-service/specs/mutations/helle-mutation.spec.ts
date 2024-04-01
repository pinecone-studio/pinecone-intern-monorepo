import { helloMutationFromPayrollService } from '@/graphql/resolvers/mutations';

describe('Hello Mutation', () => {
  it('Should call hello mutation', () => {
    expect(helloMutationFromPayrollService()).toBeDefined();
  });
});
