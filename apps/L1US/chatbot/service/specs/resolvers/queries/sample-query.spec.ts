import { sampleQuery } from '../../../src/graphql/resolvers/queries';

describe('sampleQuery', () => {
  it('should return "Hello sample query"', () => {
    const result = sampleQuery();
    expect(result).toBe('Hello sample query');
  });
});
