import { ExecutorContext } from '@nx/devkit';
import { SecretGroupModel } from '../../models';
import { connectToDatabase, disconnectFromDatabase } from '../../utils';

// pass: "X7vfUp1FelZcaPk5"

export type Executor<Options> = (options: Options, context: ExecutorContext) => Promise<{ success: boolean }>;

export type AddSecretExecutorOptions = {
  group?: string;
  env?: 'dev' | 'prod' | 'test';
  username?: string;
  password?: string;
  key?: string;
  value?: string;
};

const runAddSecretExecutor: Executor<AddSecretExecutorOptions> = async (options) => {
  try {
    const { group = '', env = '', username = '', password = '', key = '', value = '' } = options;

    if (!group) {
      throw new Error('Group is not provided');
    }

    if (!['dev', 'prod', 'test'].includes(env)) {
      throw new Error('Env is not provided');
    }

    await connectToDatabase({
      username,
      password,
    });

    let secretGroup = await SecretGroupModel.findOne({
      groupName: group,
    });

    if (!secretGroup) {
      secretGroup = await SecretGroupModel.create({
        groupName: group,
        secrets: {
          test: {},
          prod: {},
          dev: {},
        },
      });
    }

    const secrets = secretGroup.secrets ? secretGroup.secrets[env] ?? {} : {};

    await SecretGroupModel.updateOne(
      {
        groupName: group,
      },
      {
        $set: {
          secrets: {
            ...secretGroup.secrets,
            [env]: {
              ...secrets,
              [key.toUpperCase()]: value,
            },
          },
        },
      }
    );

    return { success: true };
  } catch (error) {
    console.error('Error: ', error);
    return { success: false };
  } finally {
    await disconnectFromDatabase();
  }
};

export default runAddSecretExecutor;
