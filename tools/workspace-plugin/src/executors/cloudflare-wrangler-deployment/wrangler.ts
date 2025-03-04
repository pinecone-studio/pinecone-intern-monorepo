/* eslint-disable complexity */
import { ExecutorContext, joinPathFragments, readProjectConfiguration, workspaceRoot } from '@nx/devkit';
import { execSync } from 'child_process';
import { FsTree } from 'nx/src/generators/tree';
import { WorkerDeployExecutorSchema } from './deploy/schema';
import { WorkerServeExecutorSchema } from './serve/schema';

type WranglerCommand = 'dev' | 'deploy' | 'build' | 'pages deploy';

type WranglerOptions = WorkerServeExecutorSchema | WorkerDeployExecutorSchema;

export function runWranglerCommandForProject(options: WranglerOptions, context: ExecutorContext, command: WranglerCommand) {
  const { projectName } = context;

  const tree = new FsTree(process.cwd(), false);

  const projectConfiguration = readProjectConfiguration(tree, projectName);
  const wranglerOptions = [];

  if (command === 'deploy') {
    wranglerOptions.push(joinPathFragments(workspaceRoot, projectConfiguration.targets.build.options.main));
  } else if (command === 'dev') {
    wranglerOptions.push(joinPathFragments(workspaceRoot, projectConfiguration.targets.build.options.main));
  } else if (command === 'build') {
    wranglerOptions.push(joinPathFragments(workspaceRoot, projectConfiguration.targets.build.options.main));
    wranglerOptions.push('--dry-run', '--outdir');
    wranglerOptions.push(joinPathFragments(workspaceRoot, projectConfiguration.targets.build.options.outputPath));
  }

  return new Promise((resolve) => {
    switch (command) {
      case 'dev':
        execSync(`${options['command']} ${wranglerOptions.join(' ')}`, {
          cwd: projectConfiguration.root,
          stdio: 'inherit',
        });
        break;
      case 'deploy':
        execSync(`${options['command']} ${wranglerOptions.join(' ')}`, {
          cwd: projectConfiguration.root,
          stdio: 'inherit',
        });
        break;
      case 'build':
        execSync(`${options['command']} ${wranglerOptions.join(' ')}`, {
          cwd: projectConfiguration.root,
          stdio: 'inherit',
        });
        break;
    }

    resolve({ success: true });
  });
}
