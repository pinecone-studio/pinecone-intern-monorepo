import { helloQueryFromCommentsService } from '../../src/graphql/resolvers/queries/hello-query';

describe('Hello Query', () => {
  it('Should call hello query', () => {
    expect(helloQueryFromCommentsService()).toBeDefined();
  });
});
