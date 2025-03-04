import { ExecutorContext, joinPathFragments } from '@nx/devkit';
import chalk from 'chalk';
import { execSync } from 'child_process';
import fs from 'fs';
import inquirer from 'inquirer';
import path from 'path';
import { MigrateD1AllExecutorSchema } from './schema';

export const getSqlFiles = (directory: string): string[] => {
  return fs.readdirSync(directory).filter((file) => path.extname(file) === '.sql');
};

export default async function migrateD1All(options: MigrateD1AllExecutorSchema, context: ExecutorContext) {
  const projectPath = joinPathFragments(context.workspace.projects[context.projectName].root);
  const { name, directory } = options;

  const sqlFiles = getSqlFiles(`${projectPath}/${directory}`);

  const { finalName }: { finalName: string } = await inquirer.prompt([
    {
      type: 'input',
      name: 'finalName',
      message: chalk.cyan('Please enter the database name:'),
      default: name,
    },
  ]);
  for (const sqlFile of sqlFiles) {
    executeSqlFile(finalName, projectPath, directory, sqlFile);
  }

  return { success: true };
}

export const executeSqlFile = (databaseName: string, projectPath: string, directory: string, sqlFile: string) => {
  try {
    execSync(`npx wrangler d1 execute ${databaseName} --local --file=${projectPath}/${directory}${sqlFile} --config=${projectPath}/wrangler.toml --yes`);
  } catch (error) {
    console.log(chalk.red(`${chalk.bold('FAILED')} to execute ${sqlFile} file so skipped`));
  }
};
