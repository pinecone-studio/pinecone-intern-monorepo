import chalk from 'chalk';
import { execSync } from 'child_process';
import { extractSchemaChanges, fetchSchemaDetails, findConflictingNames } from './helper';

interface SchemaChangeDetectionOptions {
  schemaDirectoryPath: string;
}

const DIFF_OUTPUT_FILE = 'cache/schema_changes.diff';

const executeShellCommand = (command: string) => {
  console.log(chalk.cyan(`Executing command: ${command}`));
  execSync(command, { stdio: 'inherit' });
};

const TYPES_TO_IGNORE = ['Query', 'Mutation'];

export default async function checkForSchemaChangesAndConflicts(options: SchemaChangeDetectionOptions) {
  const { schemaDirectoryPath } = options;

  try {
    const existingSchema = await fetchSchemaDetails();

    const diffCommand = `git diff --cached --diff-filter=AM -- ${schemaDirectoryPath} > ${DIFF_OUTPUT_FILE}`;
    executeShellCommand(diffCommand);

    console.log(chalk.cyan(`Schema changes saved to: ${DIFF_OUTPUT_FILE}`));

    const schemaChanges = extractSchemaChanges(DIFF_OUTPUT_FILE);

    const conflictingNames = findConflictingNames(existingSchema, schemaChanges, TYPES_TO_IGNORE);

    return checkConflict(conflictingNames);
  } catch (error) {
    console.error(chalk.red('Error while detecting schema changes:'), error.message);
    return { success: false };
  }
}

const checkConflict = (conflictingNames: string[]) => {
  if (conflictingNames.length > 0) {
    console.error(chalk.red(`Conflicts detected in the following names: ${conflictingNames.join(', ')}`));
    return { success: false };
  }

  console.log(chalk.green('No conflicts detected.'));
  return { success: true };
};
