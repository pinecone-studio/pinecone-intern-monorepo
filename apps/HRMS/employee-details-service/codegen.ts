import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: './apps/HRMS/employee-details-service/src/graphql/schemas',
  generates: {
    'apps/HRMS/employee-details-service/src/graphql/generated/index.ts': {
      config: {
        useIndexSignature: true,
        makeResolverTypeCallable: true,
        maybeValue: 'T',
      },
      plugins: ['typescript-resolvers', 'typescript', 'typescript-operations', 'typescript-react-apollo'],
    },
  },
};
export default config;
