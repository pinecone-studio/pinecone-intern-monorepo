import { helloQueryFromCommentsService } from '../../src/graphql/resolvers/queries/hello-query';

describe('Hello Query', () => {
  it('Should Call hello query', () => {
    expect(helloQueryFromCommentsService()).toBeDefined();
  });
});
