import { ExecutorContext, readProjectConfiguration } from '@nx/devkit';
import { execSync } from 'child_process';
import { DotenvParseOutput } from 'dotenv';
import { FsTree } from 'nx/src/generators/tree';
import { PagesDeployExecutorSchema } from './schema';

type WranglerOptionsEnvs = DotenvParseOutput;

export type WranglerOptions = { env: WranglerOptionsEnvs } & PagesDeployExecutorSchema;

export const runWranglerCommandForProject = (options: WranglerOptions, context: ExecutorContext) => {
  const { projectName: nxProjectName } = context;
  const wranglerProjectName = options.projectName;
  const tree = new FsTree(process.cwd(), false);
  const projectConfiguration = readProjectConfiguration(tree, nxProjectName);

  const wranglerOptions = buildWranglerOptions(options, wranglerProjectName || nxProjectName);

  const { CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN } = options.env;

  return new Promise((resolve) => {
    execSync(`npx @cloudflare/next-on-pages && CLOUDFLARE_ACCOUNT_ID=${CLOUDFLARE_ACCOUNT_ID} CLOUDFLARE_API_TOKEN=${CLOUDFLARE_API_TOKEN} npx wrangler pages deploy ${wranglerOptions.join(' ')}`, {
      cwd: projectConfiguration.root,
      stdio: 'inherit',
    });
    resolve({ success: true });
  });
};

const buildWranglerOptions = (options: WranglerOptions, projectName: string) => {
  const wranglerOptions = [];

  if (options['branch'] === 'main') {
    wranglerOptions.push('--branch=main');
  } else {
    wranglerOptions.push(`--branch=${(options as PagesDeployExecutorSchema).branch}`);
  }

  wranglerOptions.push(`--project-name="${projectName}"`);
  wranglerOptions.push(`--commit-hash=${(options as PagesDeployExecutorSchema).commitHash}`);

  return wranglerOptions;
};
