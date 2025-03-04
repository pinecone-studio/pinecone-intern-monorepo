type Environment = 'Development' | 'Production' | 'Testing';
export interface WorkerDeployExecutorSchema {
  env: Environment;
}
