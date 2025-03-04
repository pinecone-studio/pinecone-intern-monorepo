import chalk from 'chalk';
import { execSync } from 'child_process';

const extractTableNames = (input: string): string[] => {
  const regex = /"tbl_name": "(.*?)"/g;
  const matches: string[] = [];
  let match: RegExpExecArray | null;

  while ((match = regex.exec(input)) !== null) {
    matches.push(match[1]);
  }

  const filteredTableNames = matches.filter((name) => !name.startsWith('_'));
  return filteredTableNames;
};

export const getTableNames = (testingDb: string) => {
  const command = `npx wrangler d1 execute ${testingDb} --command "SELECT tbl_name FROM sqlite_master WHERE type='table'" --remote`;

  const result = execSync(command, { encoding: 'utf-8' });

  const cleanedResult = result.replace(/^[\s\S]*\[{/, '[').replace(/}[^}]*$/, '}');

  return extractTableNames(cleanedResult);
};

export const runCommand = (command: string) => {
  console.log(chalk.cyan(`Running command: ${command}`));
  execSync(command, { stdio: 'inherit' });
};
