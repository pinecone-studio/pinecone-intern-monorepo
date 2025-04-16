import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'apps/L2A/instagram/service/src/schemas',
  generates: {
    'apps/L2A/instagram/service/src/generated/index.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        contextType: '../types#Context',
        makeResolverTypeCallable: true,
        maybeValue: 'T',
      },
    },
  },
};

export default config;
