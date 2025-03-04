/* eslint-disable complexity */
import chalk from 'chalk';
import fs from 'fs';
import { nanoid } from 'nanoid';
import { SeedTestingExecutorSchema } from './schema';
import { getTableNames, runCommand } from './utils';

export default async function seedTestingExecutor(options: SeedTestingExecutorSchema) {
  const { productionDb, testingDb } = options;

  if (testingDb.includes('prod')) {
    console.log(chalk.red('!!!  You cannot purge prod database.  !!!'));
    return { success: false };
  }

  const fullSqlFilePath = `cache/${nanoid()}.sql`;

  console.log(chalk.green('Starting seed testing database process...'));

  console.log(chalk.yellow('Backing up production database...'));
  runCommand(`npx wrangler d1 export ${productionDb} --remote --output=${fullSqlFilePath} --no-schema`);

  console.log(chalk.yellow('Fetching table names from testing database...'));
  const tables = getTableNames(testingDb);
  console.log(chalk.yellow('Purging testing database...'));

  for (const table of tables) {
    const command = `npx wrangler d1 execute ${testingDb} --command 'DELETE FROM ${table}' --remote`;
    runCommand(command);
  }

  console.log(chalk.yellow('Restoring testing database...'));
  runCommand(`npx wrangler d1 execute ${testingDb} --remote --file=${fullSqlFilePath}`);

  console.log(chalk.yellow('Cleaning up SQL backup file...'));
  fs.unlinkSync(fullSqlFilePath);

  console.log(chalk.green('Seed testing database process completed successfully!'));
  return { success: true };
}
