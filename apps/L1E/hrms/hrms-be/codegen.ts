import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'apps/L1E/hrms/hrms-be/src/schemas',
  generates: {
    'apps/L1E/hrms/hrms-be/src/generated/index.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        contextType: 'Context',
        makeResolverTypeCallable: true,
        maybeValue: 'T',
      },
    },
  },
};

export default config;
