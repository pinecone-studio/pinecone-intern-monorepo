import { ExecutorContext } from '@nx/devkit';
import chalk from 'chalk';
import { execSync } from 'child_process';
import { ExecuteD1ChangesExecutorSchema } from './schema';

export default async function executeD1Changes(options: ExecuteD1ChangesExecutorSchema, context: ExecutorContext) {
  const projectPath = context.workspace.projects[context.projectName].root;
  const projectName = context.workspace.projects[context.projectName].name;
  const { name } = options;
  const sqlFilesOutput = execSync(`git diff --diff-filter=A --name-only HEAD~1 HEAD -- ${projectPath}/**/*.sql`).toString().trim().split('\n');
  const sqlFiles = sqlFilesOutput.filter((item) => item.endsWith('.sql'));
  if (sqlFiles.length === 0) {
    console.log(chalk.yellow(`Not found any sql migration files.`));
    process.exit(0);
  }
  executeSqlFiles(projectName, sqlFiles, name);

  return { success: true };
}

const executeSqlFiles = (projectName: string, sqlFiles: string[], databaseName: string) => {
  console.log(`"${projectName}" have migration following sql changes: \n ${JSON.stringify(sqlFiles)}`);
  for (const sqlFile of sqlFiles) executeSqlFile(sqlFile, projectName, databaseName);
};

const executeSqlFile = (sqlFile: string, projectName: string, databaseName: string) => {
  console.log(chalk.cyan(`Executing "${sqlFile}" migration file on ${projectName}`));
  try {
    execSync(`npx wrangler d1 execute ${databaseName} --remote --file=./${sqlFile} --yes`);
    console.log(chalk.green(chalk.bold(`Successfully executed "${sqlFile}" migration file on ${databaseName} database.`)));
  } catch (error) {
    console.log(chalk.red(chalk.bold(`There is error during executing ${sqlFile} on ${databaseName} database`)));
    console.error(error);
  }
};
