import { blue, green, red, yellow } from 'chalk';
import path from 'path';
import { deployCodeCoverage } from './utils/deploy-code-coverage';
import { addCypressCodeCoverageToPullRequest } from '../../utils/github/add-cypress-code-coverage-to-pull-request';
import { calculateTotalCoverage, displayCoverageRow, getReportFileHtml, isCoverageAboveThreshold, parseCoverageReport, validateCoveragePath } from '../../utils/actions';

export const addCoverageToPullRequest = async ({ path, pullRequestComment }: { path: string; pullRequestComment: string }) => {
  if (process.env.ACTION_TYPE === 'PULL_REQUEST_ACTION') {
    console.log('commentcommentcommentcomment', path, pullRequestComment);
    await addCypressCodeCoverageToPullRequest({ path, commentBody: pullRequestComment });
  }
};

const getCoverageMetricIcon = (coverageNumber: number) => {
  if (coverageNumber !== 100) {
    return '❗️';
  } else {
    return '✅';
  }
};

export const checkCypressCodeCoverage = async () => {
  console.log('projectPathprojectPathprojectPathprojectPath');
  const projectPath = process.argv.slice(2)[0];
  validateCoveragePath(projectPath);
  const coverageFolderPath = path.join(projectPath, 'coverage', 'lcov-report');
  const coverageFilePath = path.join(projectPath, 'coverage', 'lcov-report', 'index.html');

  const deployedLink = process.env.ACTION_TYPE === 'PULL_REQUEST_ACTION' ? deployCodeCoverage(coverageFolderPath) : '';

  const { statementsCoverage, branchesCoverage, functionsCoverage, linesCoverage } = parseCoverageReport(coverageFilePath);
  const totalCoverage = calculateTotalCoverage({ statementsCoverage, branchesCoverage, functionsCoverage, linesCoverage });

  const pullRequestComment = [
    displayCoverageRow(blue('E2E Coverage Report'), blue(coverageFilePath)),
    displayCoverageRow(blue('Statements'), blue(statementsCoverage)),
    displayCoverageRow(green('Branches'), green(branchesCoverage)),
    displayCoverageRow(yellow('Functions'), yellow(functionsCoverage)),
    displayCoverageRow(red('Lines'), red(linesCoverage)),
    displayCoverageRow(red('Total Coverage'), red(totalCoverage)),
  ].join('\n');

  const commentBody = `
| Metric              | Coverage   |
|---------------------|------------|
| Statements Coverage |  ${statementsCoverage}% ${getCoverageMetricIcon(Number(statementsCoverage))} |
| Branches Coverage   |  ${branchesCoverage}%  ${getCoverageMetricIcon(Number(branchesCoverage))}|
| Functions Coverage  |  ${functionsCoverage}% ${getCoverageMetricIcon(Number(functionsCoverage))} |
| Lines Coverage      |  ${linesCoverage}% ${getCoverageMetricIcon(Number(linesCoverage))} |
| Total Coverage      |  ${totalCoverage}% ${getCoverageMetricIcon(totalCoverage)} |
  `;

  const html = getReportFileHtml(coverageFolderPath, deployedLink);

  await addCoverageToPullRequest({ path: coverageFilePath, pullRequestComment: html + '\n' + commentBody });

  isCoverageAboveThreshold(totalCoverage);

  console.log(pullRequestComment);
};

checkCypressCodeCoverage();
