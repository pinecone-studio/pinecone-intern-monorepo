import { helloMutationFromCommentsService } from '@/graphql/resolvers/mutations';

describe('Hello Mutation', () => {
  it('Should call hello mutation', () => {
    expect(helloMutationFromCommentsService()).toBeDefined();
  });
});
