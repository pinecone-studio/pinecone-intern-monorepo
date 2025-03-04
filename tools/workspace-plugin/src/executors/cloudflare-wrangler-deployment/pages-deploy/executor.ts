import { ExecutorContext, joinPathFragments } from '@nx/devkit';
import { execSync } from 'child_process';
import { loadEnvFile } from './load-env-file';
import { runWranglerCommandForProject } from './pages-wrangler';
import { PagesDeployExecutorSchema } from './schema';

const deployExecutor = async (options: PagesDeployExecutorSchema, context: ExecutorContext) => {
  const projectPath = joinPathFragments(process.cwd(), context.workspace.projects[context.projectName].targets.build.options.outputPath);

  const env = loadEnvFile(joinPathFragments(projectPath, '.env'));
  const branch = getCurrentGitBranch();
  const commitHash = getCurrentGitCommitHash();

  const deployOptions = {
    branch,
    commitHash,
    commitDirty: false,
    env,
    ...options,
  };

  return runWranglerCommandForProject(deployOptions, context);
};

export default deployExecutor;

export const getCurrentGitBranch = () => {
  if (process.env.GITHUB_HEAD_REF) {
    return `${process.env.GITHUB_HEAD_REF}`.split('-')[0];
  }

  return execSync('git rev-parse --abbrev-ref HEAD').toString().trim().split('-')[0];
};

export const getCurrentGitCommitHash = () => {
  return execSync('git rev-parse HEAD').toString().trim();
};
