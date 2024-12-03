import { deployCodeCoverage } from '../../../../src/actions/e2e/utils/deploy-code-coverage';

jest.mock('fs', () => ({
  writeFileSync: jest.fn(),
}));
jest.mock('child_process', () => ({
  execSync: () => `
  https://example.com
  `,
}));

describe('deployCodeCoverage', () => {
  it('should get final html', () => {
    process.env.GITHUB_TOKEN = 'mock-token';

    const result = deployCodeCoverage('path');
    expect(result).toBe('https://example.com/');
  });
});
