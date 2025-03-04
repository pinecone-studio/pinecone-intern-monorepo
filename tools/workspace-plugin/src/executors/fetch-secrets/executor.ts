/* eslint-disable complexity */
import { GetSecretValueCommand, SecretsManagerClient } from '@aws-sdk/client-secrets-manager';
import { parse, stringify } from 'envfile';
import fs from 'fs/promises';
import { isArray, isEmpty } from 'lodash';
import os from 'os';
import path from 'path';
import { FetchSecretsExecutorSchema } from './schema';

export const createSecretsManagerClient = (region: string = 'us-west-2'): SecretsManagerClient => {
  return new SecretsManagerClient({ region });
};

export const getCachePaths = (secretName: string, ssoAccountId: string) => {
  const secretPathSegments = secretName.split('/');
  const cacheFileName = secretPathSegments.pop();

  const cacheDirectory = path.join('./cache', ssoAccountId, ...secretPathSegments, cacheFileName);
  const cacheFilePath = path.join(cacheDirectory, `${cacheFileName}.json`);

  return { cacheDirectory, cacheFilePath };
};

export const saveSecretToCache = async (secretName: string, secretValue: string, ssoAccountId: string): Promise<void> => {
  const { cacheDirectory, cacheFilePath } = getCachePaths(secretName, ssoAccountId);

  try {
    await fs.mkdir(cacheDirectory, { recursive: true });
    const cacheContent = JSON.stringify(secretValue);

    await fs.writeFile(cacheFilePath, cacheContent, 'utf8');
  } catch (error) {
    console.error(`Error writing cache file: ${error}`);
    throw error;
  }
};

export const loadSecretFromCache = async (secretName: string, ssoAccountId: string): Promise<string | undefined> => {
  const { cacheFilePath } = getCachePaths(secretName, ssoAccountId);

  try {
    const cacheFileContent = await fs.readFile(cacheFilePath, 'utf8');
    const cacheData = JSON.parse(cacheFileContent);

    return cacheData;
  } catch (error) {
    console.log(`No cache file found for ${secretName}. A new one will be created.`);
    return undefined;
  }
};

export const fetchSecretFromSecretsManager = async (secretName: string, ssoAccountId: string, region?: string): Promise<string> => {
  const client = createSecretsManagerClient(region);

  try {
    const response = await client.send(new GetSecretValueCommand({ SecretId: secretName, VersionStage: 'AWSCURRENT' }));
    const secretValue = JSON.parse(String(response.SecretString));

    await saveSecretToCache(secretName, secretValue, ssoAccountId);

    return secretValue;
  } catch (error) {
    console.log(`Failed to fetch secret ${secretName}`);
    throw error;
  }
};

export const getConfigFromHomeDirectory = async () => {
  try {
    const awsDir = path.join(os.homedir(), '.aws');
    const configPath = path.join(awsDir, 'config');

    const res = await fs.readFile(configPath, 'utf8');
    const match = res.match(/sso_account_id\s*=\s*(\d+)/);

    const ssoAccountId = match[1];
    return ssoAccountId;
  } catch (error) {
    return '';
  }
};

export const getSecretValue = async (secretName: string, region: string): Promise<string> => {
  const ssoAccountId = await getConfigFromHomeDirectory();

  const cachedSecret = await loadSecretFromCache(secretName, ssoAccountId);

  return cachedSecret || (await fetchSecretFromSecretsManager(secretName, ssoAccountId, region));
};

export const validateSecretIsNotEmpty = (secret: string): void => {
  if (isEmpty(secret)) {
    throw new Error('No secrets fetched');
  }
};

export const writeSecretsToTfvars = async (shouldGenerateTfvars: boolean, secret: string, outputDir: string): Promise<void> => {
  if (!shouldGenerateTfvars) return;

  const parsedSecret = parse(secret);
  const tfvarsContent = Object.keys(parsedSecret)
    .map((key) => `${key} = "${parsedSecret[key]}"`)
    .join('\n');

  await fs.writeFile(path.join(outputDir, 'main.tfvars'), tfvarsContent);
};

export const formatSecretAsString = (value: unknown): string => {
  return !isEmpty(value) ? stringify(value) : (value as string);
};

export const fetchMultipleSecrets = async (region: string, secretIdentifiers: string | string[]): Promise<string> => {
  if (isArray(secretIdentifiers)) {
    const secrets = await Promise.all(secretIdentifiers.map((secretId) => getSecretValue(secretId, region).then(formatSecretAsString)));

    return secrets.join('');
  } else {
    const secret = await getSecretValue(secretIdentifiers, region);

    return formatSecretAsString(secret);
  }
};
export const toJson = (content: string) => {
  const lines = content.split('\n');
  const json = {};

  lines.forEach((line) => {
    const [key, value] = line.split('=');
    json[key] = value;
  });

  return JSON.stringify(json);
};
export const executeSecretsRetrieval = async (options: FetchSecretsExecutorSchema): Promise<{ success: boolean }> => {
  try {
    const { path: outputDir = '.', region = 'us-west-2', generateTerraformEnv = false, secrets, filename = '.env' } = options;
    const secretContent = await fetchMultipleSecrets(region, secrets);

    validateSecretIsNotEmpty(secretContent);

    console.log('Secrets fetched successfully');

    await writeSecretsToTfvars(generateTerraformEnv, secretContent, outputDir);

    const fileFormat = filename.split('.').at(-1);

    if (fileFormat === 'json') {
      await fs.writeFile(path.join(outputDir, filename), toJson(secretContent));
    } else {
      await fs.writeFile(path.join(outputDir, filename), secretContent);
    }

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};
export default executeSecretsRetrieval;
