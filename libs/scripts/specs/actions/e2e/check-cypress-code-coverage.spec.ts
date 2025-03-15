import * as addCypressCodeCoverageToPullRequest from '../../../src/utils/github/add-cypress-code-coverage-to-pull-request';
import * as cypressCodeCoverage from '../../../src/actions/e2e/check-cypress-code-coverage';
import * as cypressCodeCoverageUtils from '../../../src/utils/actions/check-cypress-code-coverage-utils';

jest.mock('../../../src/utils/actions/check-cypress-code-coverage-utils.ts', () => ({
  validateCoveragePath: jest.fn(),
  parseCoverageReport: jest.fn().mockReturnValueOnce({ statementsCoverage: '100', branchesCoverage: '70', functionsCoverage: '90', linesCoverage: '85' }),
  calculateTotalCoverage: jest.fn(),
  isCoverageAboveThreshold: jest.fn(),
  displayCoverageRow: jest.fn(),
  getReportFileHtml: () => '',
}));

jest.mock('../../../src/actions/e2e/utils/deploy-code-coverage.ts', () => ({
  deployCodeCoverage: () => '',
}));

jest.mock('../../../src/utils/github/add-cypress-code-coverage-to-pull-request.ts', () => ({
  addCypressCodeCoverageToPullRequest: jest.fn(),
}));

jest.mock('@actions/github');

jest.mock('path', () => ({
  join: jest.fn(),
}));

describe('addCoverageToPullRequest', () => {
  beforeEach(() => {
    process.env = { ...process.env, ACTION_TYPE: 'PULL_REQUEST_ACTION' };
  });

  afterEach(() => {
    process.env = { ...process.env };
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('Should call addCypressCodeCoverageToPullRequest function when ACTION_TYPE is available', async () => {
    const mockValidateCoveragePath = jest.spyOn(cypressCodeCoverageUtils, 'validateCoveragePath');
    mockValidateCoveragePath.mockImplementation();

    const mockParseCoverageReport = jest.spyOn(cypressCodeCoverageUtils, 'parseCoverageReport');
    mockParseCoverageReport.mockImplementation();

    const mockAddCypressCodeCoverageToPullRequest = jest.spyOn(addCypressCodeCoverageToPullRequest, 'addCypressCodeCoverageToPullRequest');
    mockAddCypressCodeCoverageToPullRequest.mockImplementation();

    await cypressCodeCoverage.addCoverageToPullRequest({ path: '/test', pullRequestComment: 'test' });

    expect(mockAddCypressCodeCoverageToPullRequest).toHaveBeenCalled();
  });

  it('Should call checkCypressCodeCoverage with ACTION_TYPE not provided', async () => {
    const mockValidateCoveragePath = jest.spyOn(cypressCodeCoverageUtils, 'validateCoveragePath');
    mockValidateCoveragePath.mockImplementation();

    const mockParseCoverageReport = jest.spyOn(cypressCodeCoverageUtils, 'parseCoverageReport');
    mockParseCoverageReport.mockImplementation(() => ({ statementsCoverage: '80', linesCoverage: '80', functionsCoverage: '80', branchesCoverage: '80' }));

    const mockAddCypressCodeCoverageToPullRequest = jest.spyOn(addCypressCodeCoverageToPullRequest, 'addCypressCodeCoverageToPullRequest');
    mockAddCypressCodeCoverageToPullRequest.mockImplementation();

    await cypressCodeCoverage.checkCypressCodeCoverage();
  });
});
