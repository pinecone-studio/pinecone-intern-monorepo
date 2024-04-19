import { maybe } from '@apollo/client/utilities';
import type { CodegenConfig } from '@graphql-codegen/cli';
import { makeResolver } from 'next/dist/server/router';

const config: CodegenConfig = {
  overwrite: true,
  schema: './apps/HRMS/leaving-service/src/graphql/schemas',
  generates: {
    'apps/HRMS/leaving-service/src/graphql/generated/index.ts': {
      config: {
        useIndexSignature: true,
        makeResolverTypeCallable: true,
        maybeValue: 'T'
      },
      plugins: ['typescript-resolvers', 'typescript', 'typescript-operations', 'typescript-react-apollo'],
    },
  },
};
export default config;
