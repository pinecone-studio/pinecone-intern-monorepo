import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'apps/L1AB/concert-ticket-booking/backend/src/schemas',
  generates: {
    'apps/L1AB/concert-ticket-booking/backend/src/generated/index.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        useIndexSignature: true,
        makeResolverTypeCallable: true,
        maybeValue: 'T',
      },
    },
  },
};

export default config;
