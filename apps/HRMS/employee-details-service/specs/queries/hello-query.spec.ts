import { helloQueryFromEmployeeDetailsService } from '../../src/graphql/resolvers/queries';

describe('Hello Query', () => {
  it('Should call hello query', () => {
    expect(helloQueryFromEmployeeDetailsService()).toBeDefined();
  });
});
