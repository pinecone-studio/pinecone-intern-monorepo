import { addProjectConfiguration, formatFiles, generateFiles, Tree } from '@nx/devkit';
import * as path from 'path';
import { CloudflareServiceGeneratorSchema } from './schema';

export async function cloudflareServiceGenerator(tree: Tree, options: CloudflareServiceGeneratorSchema) {
  const projectRoot = `${options.directory}`;
  addProjectConfiguration(tree, options.name, {
    root: projectRoot,
    projectType: 'application',
    sourceRoot: `${projectRoot}/src`,
    targets: {},
  });

  const paths = projectRoot.split('/');
  const parentDirs = new Array(paths.length).fill('..').join('/');

  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, { ...options, parentDirs });
  await formatFiles(tree);
}

export default cloudflareServiceGenerator;
