import { helloMutationFromLeaderboardService } from '@/graphql/resolvers/mutations';

describe('Hello Mutation', () => {
  it('Should call hello mutation', () => {
    expect(helloMutationFromLeaderboardService()).toBeDefined();
  });
});
