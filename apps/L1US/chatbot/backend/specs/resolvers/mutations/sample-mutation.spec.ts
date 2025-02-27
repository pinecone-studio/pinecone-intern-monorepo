import { sampleMutation } from '../../../src/resolvers/mutations';

describe('sampleMutation', () => {
  it('should return "Sample mutation created"', () => {
    const result = sampleMutation();
    expect(result).toBe('Sample mutation created');
  });
});
