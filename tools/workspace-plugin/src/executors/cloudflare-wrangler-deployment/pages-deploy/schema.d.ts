export interface PagesDeployExecutorSchema {
  command?: string;
  dist?: string;
  projectName?: string;
  branch?: string;
  commitHash?: string;
  commitMessage?: string;
  commitDirty?: boolean;
  env?: DotenvParseOutput;
}
