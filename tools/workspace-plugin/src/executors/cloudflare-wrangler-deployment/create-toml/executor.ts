import { ExecutorContext, joinPathFragments } from '@nx/devkit';
import fs from 'fs/promises';
import { WorkerDeployExecutorSchema } from './schema';

type Environment = 'Development' | 'Production' | 'Testing';

export const getTomlFile = (env: Environment) => {
  const fileMap = {
    Testing: 'wrangler.testing.toml',
    Development: 'wrangler.dev.toml',
    Production: 'wrangler.prod.toml',
  };
  return fileMap[env];
};

export default async function createToml(options: WorkerDeployExecutorSchema, context: ExecutorContext) {
  const projectPath = joinPathFragments(process.cwd(), context.workspace.projects[context.projectName].sourceRoot);
  const { env } = options;
  const wranglerFilePath = joinPathFragments(projectPath, getTomlFile(env));
  await fs.copyFile(wranglerFilePath, joinPathFragments(projectPath, 'wrangler.toml'));
  return { success: true };
}
