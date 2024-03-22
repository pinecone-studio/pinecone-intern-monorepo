import chalk from 'chalk';
import {
  copyDevToLocalEnv,
  runFederationLocally,
  runSelectedServices,
} from '../utils';

export const runDevLocalCommandOnFederation = async () => {
  try {
    copyDevToLocalEnv(
      'apps/federation/.env.development',
      'apps/federation/.env.local'
    );
    const selectedServices = process.argv.slice(3);
    await Promise.all(selectedServices.map(runSelectedServices));
    runFederationLocally();
  } catch (err) {
    console.log(
      chalk.red(`error occurred when running federation locally, ${err}`)
    );
    process.exit(1);
  }
};

runDevLocalCommandOnFederation();
