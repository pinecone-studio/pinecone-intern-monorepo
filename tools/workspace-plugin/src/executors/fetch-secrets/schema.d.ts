export interface FetchSecretsExecutorSchema {
  path?: string;
  filename?: string;
  secrets: string | string[];
  region?: string;
  generateTerraformEnv?: boolean;
}
