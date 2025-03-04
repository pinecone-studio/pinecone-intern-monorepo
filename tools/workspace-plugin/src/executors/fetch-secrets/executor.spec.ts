/* eslint-disable max-lines */
import { SecretsManagerClient } from '@aws-sdk/client-secrets-manager';
import { stringify } from 'envfile';
import fs from 'fs/promises';
import os from 'os';
import executeSecretsRetrieval, * as getSecrets from './executor';

jest.mock('fs/promises');
jest.mock('@aws-sdk/client-secrets-manager');

const mockSecrets = { userToken: '1234asd', apiKey: '123ASD' };
const convertedSecrets = stringify(mockSecrets);

describe('validateSecretIsNotEmpty', () => {
  it('Should throw an error when the secret is true', () => {
    expect(() => getSecrets.validateSecretIsNotEmpty('')).toThrow('No secrets fetched');
  });

  it('Should not throw an error when the secret is false', () => {
    expect(() => getSecrets.validateSecretIsNotEmpty('secret')).not.toThrow();
  });
});

describe('writeSecretsToTfvars', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should write tfvars file containing secrets when generateTerraformEnv is true', async () => {
    const generateTerraformEnv = true;
    const secret = '{"key1":"value1","key2":"value2"}';
    const path = '/path/to/';

    jest.mock('envfile', () => ({
      parse: jest.fn().mockReturnValue({ key1: 'value1', key2: 'value2' }),
    }));

    const expectedFilePath = '/path/to/main.tfvars';
    const expectedFileContent = '{"key1" = "value1,key2:value2}"';

    await getSecrets.writeSecretsToTfvars(generateTerraformEnv, secret, path);

    expect(fs.writeFile).toHaveBeenCalledWith(expectedFilePath, expectedFileContent);
  });

  it('Should not write tfvars file when generateTerraformEnv is false', async () => {
    const generateTerraformEnv = false;
    const secret = '{"key1":"value1","key2":"value2"}';
    const path = '/path/to/';

    await getSecrets.writeSecretsToTfvars(generateTerraformEnv, secret, path);

    expect(fs.writeFile).not.toHaveBeenCalled();
  });
});

describe('fetchSecretFromSecretsManager', () => {
  it('Should run AWS Secrets manager without any error', async () => {
    const mockSecretName = 'mockSecret';
    const mockSSOAccountId = 'mockAccountId';
    const mockRegion = 'us-west-2';
    const mockSecretValue = ["'key': 'value'"];

    (SecretsManagerClient.prototype.send as jest.Mock).mockResolvedValueOnce({
      SecretString: JSON.stringify(mockSecretValue),
    });

    const result = await getSecrets.fetchSecretFromSecretsManager(mockSecretName, mockSSOAccountId, mockRegion);

    expect(result).toEqual(mockSecretValue);
  });

  it('should throw an error if fetching secret fails', async () => {
    const mockSecretName = 'mockSecret';
    const mockSSOAccountId = 'mockAccountId';
    const mockRegion = 'us-west-2';

    (SecretsManagerClient.prototype.send as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch secret'));

    await expect(getSecrets.fetchSecretFromSecretsManager(mockSecretName, mockSSOAccountId, mockRegion)).rejects.toThrow('Failed to fetch secret');
  });
});

describe('callAWSSecretsManager', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should get secrets when secretkeys is array string.', async () => {
    jest.spyOn(fs, 'readFile').mockResolvedValue(`
    [default]
    sso_account_id = 757175407058
    region = us-west-2

    [default]
    sso_account_id = 757175407058
    region = us-east-1
  `);
    jest.spyOn(getSecrets, 'fetchSecretFromSecretsManager').mockResolvedValue('secret-value');
    const res = await getSecrets.fetchMultipleSecrets('us-west-2', ['VercelTokens']);

    expect(typeof res).toEqual('string');
  });

  it('Should get secrets when secretkeys is string', async () => {
    jest.spyOn(fs, 'readFile').mockResolvedValue(`
    [default]
    sso_account_id = 757175407058
    region = us-west-2

    [default]
    sso_account_id = 757175407058
    region = us-east-1
  `);

    jest.spyOn(getSecrets, 'fetchSecretFromSecretsManager').mockResolvedValue('secret-value');

    const res = await getSecrets.fetchMultipleSecrets('us-west-2', 'VercelToken');
    expect(typeof res).toEqual('string');
  });
});

describe('executeGetSecrets', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return error when executeGetSecrets is unsuccessful', async () => {
    const options = {
      secrets: [''],
    };

    jest.spyOn(getSecrets, 'fetchMultipleSecrets').mockRejectedValue(new Error('Failed to fetch secrets'));
    const result = await executeSecretsRetrieval(options);
    expect(result).toEqual({ success: false });
  });

  it('should return { success: true } when secrets are fetched and written successfully', async () => {
    const options = {
      path: '/mock/path',
      region: 'us-west-2',
      generateTerraformEnv: true,
      secrets: ['mockSecretName'],
    };

    jest.spyOn(fs, 'readFile').mockResolvedValue('{ "secrets": "values" }');
    jest.spyOn(getSecrets, 'fetchMultipleSecrets').mockResolvedValue('mockSecretValue');
    jest.spyOn(getSecrets, 'validateSecretIsNotEmpty').mockImplementation();

    await getSecrets.loadSecretFromCache('VercelToken', '757175407058');

    const result = await executeSecretsRetrieval(options);
    expect(result).toEqual({ success: true });
  });

  it('should return { success: true } when secrets are fetched and written successfully without cache', async () => {
    const options = {
      path: '/mock/path',
      region: 'us-west-2',
      generateTerraformEnv: true,
      secrets: ['VercelToken'],
    };

    jest.spyOn(fs, 'readFile').mockResolvedValue(`
    [default]
    sso_account_id = 757175407058
    region = us-west-2

    [default]
    sso_account_id = 757175407058
    region = us-east-1
  `);

    const result = await executeSecretsRetrieval(options);
    expect(result).toEqual({ success: true });
  });

  it('should return { success: true } when secrets are fetched and written successfully without cache 2', async () => {
    const options = {
      path: '/mock/path',
      region: 'us-west-2',
      generateTerraformEnv: true,
      secrets: ['VercelToken'],
      filename: 'mock.json',
    };

    jest.spyOn(fs, 'readFile').mockResolvedValue(`
    [default]
    sso_account_id = 757175407058
    region = us-west-2

    [default]
    sso_account_id = 757175407058
    region = us-east-1
  `);

    const result = await executeSecretsRetrieval(options);
    expect(result).toEqual({ success: true });
  });
});

describe('AWS Secrets Manager function', () => {
  it('Should checks if secrets are converted into string when it is not empty', () => {
    const res = getSecrets.formatSecretAsString(mockSecrets);
    expect(res).toBe(convertedSecrets);
  });

  it('Should checks if secrets are converted into string when it is empty', () => {
    const res = getSecrets.formatSecretAsString({});
    expect(res).toEqual({});
  });

  it('Should checks if aws secrets manager client is called', async () => {
    getSecrets.createSecretsManagerClient();
  });
});

describe('setSecretInCache', () => {
  it('should handle error while setting secret in cache', async () => {
    const mockSecretName = 'mockSecretName';
    const mockSecretValue = 'mockSecretValue';
    const mockError = new Error('Error writing cache file');

    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();
    jest.spyOn(fs, 'writeFile').mockRejectedValue(mockError);
    await expect(getSecrets.saveSecretToCache(mockSecretName, mockSecretValue, '757175407058')).rejects.toThrowError(mockError);
    expect(console.error).toHaveBeenCalledWith(`Error writing cache file: ${mockError}`);
    consoleErrorMock.mockRestore();
  });
});

describe('getConfigFromHomeDirectory', () => {
  beforeAll(() => {
    jest.spyOn(os, 'homedir').mockReturnValue('/mock/home/dir');
  });

  it('should return the SSO account ID from the config file', async () => {
    jest.spyOn(fs, 'readFile').mockResolvedValue(`
      [default]
      sso_account_id = 757175407058
      region = us-west-2

      [default]
      sso_account_id = 757175407058
      region = us-east-1
    `);

    const result = await getSecrets.getConfigFromHomeDirectory();

    expect(result).toBe('757175407058');
  });

  it('should throw an error if the default section is not found', async () => {
    jest.spyOn(fs, 'readFile').mockResolvedValue(`
      [profile other]
      sso_account_id = 757175407058
      region = us-east-1
    `);

    await getSecrets.getConfigFromHomeDirectory();
  });

  it('should throw an error if sso_account_id in the default section is not found', async () => {
    jest.spyOn(fs, 'readFile').mockResolvedValue(`
    [default]
    sso_account = 757175407058
    region = us-west-2

    [default]
    sso_account = 757175407058
    region = us-east-1
  `);

    await getSecrets.getConfigFromHomeDirectory();
  });
});

describe('getSecret', () => {
  beforeAll(() => {
    jest.spyOn(os, 'homedir').mockReturnValue('/mock/home/dir');
  });

  it('should return cached secret when it exists', async () => {
    jest.spyOn(fs, 'readFile').mockResolvedValue(`
    [default]
    sso_account_id = 757175407058
    region = us-west-2

    [default]
    sso_account_id = 757175407058
    region = us-east-1
  `);

    const mockCachedSecret = JSON.stringify({ userToken: '1234asd', apiKey: '123ASD' });
    jest.spyOn(getSecrets, 'loadSecretFromCache').mockResolvedValue(mockCachedSecret);
    jest.spyOn(getSecrets, 'fetchSecretFromSecretsManager').mockResolvedValue('secret-value');

    const secret = await getSecrets.getSecretValue('mockSecretName', 'us-west-2');
    expect(secret).toEqual(mockCachedSecret);
  });

  it('should return cached secret when it doesnt exist', async () => {
    jest.spyOn(fs, 'readFile').mockResolvedValue(`
    [default]
    sso_account_id = 757175407058
    region = us-west-2

    [default]
    sso_account_id = 757175407058
    region = us-east-1
  `);

    const mockCachedSecret = JSON.stringify({ userToken: '1234asd', apiKey: '123ASD' });
    jest.spyOn(getSecrets, 'loadSecretFromCache').mockResolvedValue(mockCachedSecret);
    jest.spyOn(getSecrets, 'fetchSecretFromSecretsManager').mockResolvedValue('secret-value');

    const secret = await getSecrets.getSecretValue('mockSecretName', 'us-west-2');

    expect(secret).toEqual(mockCachedSecret);
  });
});
