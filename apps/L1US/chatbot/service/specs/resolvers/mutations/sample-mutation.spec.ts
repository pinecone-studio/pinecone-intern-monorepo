import { sampleMutation } from '../../../src/graphql/resolvers/mutations/sample-mutation';

describe('sampleMutation', () => {
  it('should return "Hello sample mutation"', () => {
    const result = sampleMutation();
    expect(result).toBe('Hello sample mutation');
  });
});
