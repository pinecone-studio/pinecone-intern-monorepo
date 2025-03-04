import { ExecutorContext, joinPathFragments } from '@nx/devkit';
import chalk from 'chalk';
import { execSync } from 'child_process';
import fs from 'fs';
import inquirer from 'inquirer';
import path from 'path';
import { MigrateD1ExecutorSchema } from './schema';

export const getSqlFiles = (directory: string): string[] => {
  return fs.readdirSync(directory).filter((file) => path.extname(file) === '.sql');
};

export default async function migrateD1(options: MigrateD1ExecutorSchema, context: ExecutorContext) {
  const projectPath = joinPathFragments(context.workspace.projects[context.projectName].root);
  const { name, directory } = options;

  const sqlFiles = getSqlFiles(`${projectPath}/${directory}`);

  if (sqlFiles.length === 0) {
    console.log(chalk.red('No SQL files found in the directory.'));
    process.exit(1);
  }

  const { selectedFile }: { selectedFile: string } = await inquirer.prompt([
    {
      type: 'list',
      name: 'selectedFile',
      message: chalk.cyan('Please choose an SQL file to execute:'),
      choices: sqlFiles,
    },
  ]);

  const { finalName }: { finalName: string } = await inquirer.prompt([
    {
      type: 'input',
      name: 'finalName',
      message: chalk.cyan('Please enter the database name:'),
      default: name,
    },
  ]);

  execSync(`npx wrangler d1 execute ${finalName} --local --file=${projectPath}/${directory}${selectedFile} --config=${projectPath}/wrangler.toml --yes`);

  return { success: true };
}
