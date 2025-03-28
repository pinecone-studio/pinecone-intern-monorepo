/* eslint-disable no-secrets/no-secrets */
import { execSync } from 'child_process';
import { writeFileSync } from 'fs';
import path from 'path';

export const deployCodeCoverage = (folderPath: string) => {
  addPackageJsonToCoverageFolder(folderPath);
  addMiddlewareToCoverageFolder(folderPath);

  execSync(`bunx dotenv -v VERCEL_ORG_ID=team_0ASDilhqwPl5fll9OnzqDM30 -v VERCEL_PROJECT_ID=prj_pIIVA64AUEMxHNtx0LYEpSA5Gbnj -- vercel pull --yes --environment=preview --token=$VERCEL_TOKEN`, {
    cwd: folderPath,
  });
  execSync(`bunx vercel build --token=$VERCEL_TOKEN`, { cwd: folderPath });
  const deploymentCommandResult = execSync(
    `bunx dotenv -v VERCEL_ORG_ID=team_0ASDilhqwPl5fll9OnzqDM30 -v VERCEL_PROJECT_ID=prj_pIIVA64AUEMxHNtx0LYEpSA5Gbnj -- vercel --archive=tgz --prebuilt --token=$VERCEL_TOKEN`,
    {
      cwd: folderPath,
    }
  );

  const resultLines = deploymentCommandResult.toString().split('\n');
  const deployedLink = resultLines
    .reverse()
    .find((line) => line.trim().startsWith(`https://`))
    .trim();

  return deployedLink + '/';
};

const addPackageJsonToCoverageFolder = (folderPath: string) => {
  writeFileSync(path.join(folderPath, 'package.json'), '{"private": true,"dependencies": {"@vercel/edge": "^0.1.2"}}');
};
const addMiddlewareToCoverageFolder = (folderPath: string) => {
  writeFileSync(
    path.join(folderPath, 'middleware.js'),
    `
    import { next } from '@vercel/edge';

    export default function middleware(req) {
        return next({
            headers: {
                'Referrer-Policy': 'origin-when-cross-origin',
                'X-Frame-Options': 'DENY',
                'X-Content-Type-Options': 'nosniff',
                'X-DNS-Prefetch-Control': 'on',
                'Strict-Transport-Security':
                    'max-age=31536000; includeSubDomains; preload',
            },
        });
    }
`
  );
};
