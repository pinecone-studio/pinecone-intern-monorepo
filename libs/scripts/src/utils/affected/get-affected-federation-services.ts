import * as fs from 'fs';

const federationMicroservicesPath = 'apps/federation/.env.testing';

export const parseMicroserviceName = (line: string): string => {
  const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=/);
  return match ? match[1].toLowerCase().replace(/_/g, '-') : '';
};

export const checkFileExistence = (path: string): void => {
  if (!fs.existsSync(path)) {
    throw new Error(`Could not find any file on this path: ${path}`);
  }
};

export const readFileIfExists = (path: string): string => {
  checkFileExistence(path);
  return fs.readFileSync(path, 'utf-8');
};

export const getFederationServices = (): Set<string> => {
  const fileContent = readFileIfExists(federationMicroservicesPath);
  return new Set(fileContent.split('\n').map(parseMicroserviceName));
};

export const getAffectedFederationServices = (
  affectedApps: string[]
): string[] => {
  const federationServices = getFederationServices();
  return affectedApps.filter(
    (app) => federationServices.has(app) || app === 'federation'
  );
};
