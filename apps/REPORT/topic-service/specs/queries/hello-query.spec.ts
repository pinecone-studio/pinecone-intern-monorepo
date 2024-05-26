import { helloQueryFromTopicService } from '../../src/graphql/resolvers/queries/hello-query';

describe('Hello Query', () => {
  it('Should call hello query', () => {
    expect(helloQueryFromTopicService()).toBeDefined();
  });
});
