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

  const { CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN } = options.env;

  return new Promise((resolve) => {
    execSync(`CLOUDFLARE_ACCOUNT_ID=${CLOUDFLARE_ACCOUNT_ID} CLOUDFLARE_API_TOKEN=${CLOUDFLARE_API_TOKEN} npx wrangler versions upload --name=${wranglerProjectName}`, {
      cwd: projectConfiguration.root,
      stdio: 'inherit',
    });

    resolve({ success: true });
  });
};
