import chalk from 'chalk';
import { execSync } from 'child_process';
import fs from 'fs';
import { nanoid } from 'nanoid';
import { SeedLocalExecutorSchema } from './schema';

const runCommand = (command: string) => {
  console.log(chalk.cyan(`Running command: ${command}`));
  execSync(command, { stdio: 'inherit' });
};

export default async function seedLocalExecutor(options: SeedLocalExecutorSchema) {
  const { dbName, tomlPath } = options;

  const localDbPath = tomlPath.split('/').slice(0, -1).join('/') + '/.wrangler/state/v3/d1';

  console.log(chalk.green('Starting seed local database process...'));

  console.log(chalk.red('Deleting local database...'));
  fs.rmSync(localDbPath, { recursive: true, force: true });
  console.log(chalk.green('Local database deleted successfully!'));

  const fullSqlFilePath = `cache/${nanoid()}.sql`;
  console.log(chalk.yellow('Backing up remote database...'));
  runCommand(`npx wrangler d1 export ${dbName} --remote --output=${fullSqlFilePath}`);

  console.log(chalk.yellow('Restoring local database...'));
  runCommand(`npx wrangler d1 execute ${dbName} --local --config=${tomlPath} --file=${fullSqlFilePath}`);

  console.log(chalk.yellow('Cleaning up SQL backup file...'));
  fs.unlinkSync(fullSqlFilePath);

  console.log(chalk.green('Seed local database process completed successfully!'));
  return { success: true };
}
