import { helloQueryFromDocumentsService } from '../../src/graphql/resolvers/queries/hello-query';

describe('Hello Query', () => {
  it('Should call hello query', () => {
    expect(helloQueryFromDocumentsService()).toBeDefined();
  });
});
