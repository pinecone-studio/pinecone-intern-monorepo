import { helloMutationFromCommentsService } from '@/graphql/resolvers/mutations/hello-mutation';

describe('Hello Mutation', () => {
  it('Should call hello mutation', () => {
    expect(helloMutationFromCommentsService()).toBeDefined();
  });
});
