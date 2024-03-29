import { exampleQueryFromProfileService } from '@/graphql/resolvers/queries';

describe('Hello Query', () => {
  it('Should call hello query', () => {
    expect(exampleQueryFromProfileService()).toBeDefined();
  });
});
