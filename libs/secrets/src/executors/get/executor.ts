import { ExecutorContext } from '@nx/devkit';
import { writeFile } from 'fs/promises';
import { SecretGroupModel } from '../../models';
import { connectToDatabase, disconnectFromDatabase } from '../../utils';

export type Executor<Options> = (
  options: Options,
  context: ExecutorContext
) => Promise<{ success: boolean }>;

export type GetSecretsExecutorOptions = {
  groups?: string[];
  env?: 'dev' | 'prod' | 'test';
};

const runGetSecretsExecutor: Executor<GetSecretsExecutorOptions> = async (
  options,
  context
) => {
  try {
    const {
      projectName,
      projectsConfigurations: { projects },
    } = context;

    const projectPath = projects[projectName].root;

    const { groups = [], env = 'dev' } = options;

    if (!groups.length) {
      throw new Error('Groups are empty');
    }

    if (!['dev', 'prod', 'test'].includes(env)) {
      throw new Error('Invalid env');
    }

    await connectToDatabase({});

    const secretGroups = await SecretGroupModel.find({
      groupName: { $in: groups },
    });

    if (secretGroups.length === 0) {
      throw new Error('No secrets found');
    }

    const secrets = secretGroups.reduce((acc, group) => {
      const secrets = group.secrets[env];
      return { ...acc, ...secrets };
    }, {});

    let envContent = '';

    for (const key in secrets) {
      if (Object.hasOwnProperty.call(secrets, key)) {
        envContent += `${key}=${secrets[key]}\n`;
      }
    }

    await writeFile(projectPath + '/.env', envContent);

    return { success: true };
  } catch (error) {
    console.error('Error: ', error);

    return { success: false };
  } finally {
    await disconnectFromDatabase();
  }
};

export default runGetSecretsExecutor;
