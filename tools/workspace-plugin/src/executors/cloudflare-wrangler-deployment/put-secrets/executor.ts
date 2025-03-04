import { ExecutorContext } from '@nx/devkit';
import { runWranglerCommandForProject } from '../wrangler';
import { WorkerDeployExecutorSchema } from './schema';

export default async function putSecretsExecutor(options: WorkerDeployExecutorSchema, context: ExecutorContext) {
  return runWranglerCommandForProject(options, context, 'put-secrets');
}
