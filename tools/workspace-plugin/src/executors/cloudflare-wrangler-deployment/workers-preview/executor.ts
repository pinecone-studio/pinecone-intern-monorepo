import { ExecutorContext, joinPathFragments } from '@nx/devkit';
import { loadEnvFile } from './load-env-file';
import { runWranglerCommandForProject } from './preview-workers';
import { PagesDeployExecutorSchema } from './schema';

const deployExecutor = async (options: PagesDeployExecutorSchema, context: ExecutorContext) => {
  const projectPath = options.path;

  const env = loadEnvFile(joinPathFragments(projectPath, '.dev.vars'));

  const deployOptions = {
    commitDirty: false,
    env,
    ...options,
  };

  return runWranglerCommandForProject(deployOptions, context);
};

export default deployExecutor;
