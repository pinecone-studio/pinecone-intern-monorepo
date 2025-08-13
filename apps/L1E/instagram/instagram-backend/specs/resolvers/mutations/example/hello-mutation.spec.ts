import { helloMutation } from '../../../../src/resolvers/mutations/example/hello-mutation';

describe('helloMutation', () => {
  it('should return helloMutation', async () => {
    await expect(helloMutation()).resolves.toBe('helloMutation');
  });
});

