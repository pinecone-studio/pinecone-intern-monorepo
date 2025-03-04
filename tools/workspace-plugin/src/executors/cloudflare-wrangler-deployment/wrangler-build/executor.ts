import { ExecutorContext } from '@nx/devkit';
import { runWranglerCommandForProject } from '../wrangler';
import { WorkerBuildExecutorSchema } from './schema';

export default async function buildExecutor(options: WorkerBuildExecutorSchema, context: ExecutorContext) {
  return runWranglerCommandForProject(options, context, 'build');
}
