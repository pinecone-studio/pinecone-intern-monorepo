import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: './apps/HRMS/payroll-service/src/graphql/schemas',
  generates: {
    'apps/HRMS/payroll-service/src/graphql/generated/index.ts': {
      config: {
        useIndexSignature: true,
      },
      plugins: ['typescript-resolvers', 'typescript', 'typescript-operations', 'typescript-react-apollo'],
    },
  },
};
export default config;
