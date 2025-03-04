import { gql, request } from 'graphql-request';

const INTROSPECTION_QUERY = gql`
  query IntrospectSchema {
    __schema {
      types {
        name
      }
      queryType {
        fields {
          name
        }
      }
      mutationType {
        fields {
          name
        }
      }
    }
  }
`;

const subgraphEndpoint = 'https://int-universal-federation-testing.vercel.app/graphql';

type SchemaType = {
  name: string;
};

type SubgraphEndpointType = {
  __schema: {
    types: SchemaType[];
    queryType: {
      fields: SchemaType[];
    };
    mutationType: {
      fields: SchemaType[];
    };
  };
};

export const fetchSchemaDetails = async () => {
  const subgraphData: SubgraphEndpointType = await request(subgraphEndpoint, INTROSPECTION_QUERY);

  const {
    __schema: { types, queryType, mutationType },
  } = subgraphData;

  const subgraphTypes = types.map((type) => type.name);
  const subgraphQueries = queryType.fields.map((field) => field.name);
  const subgraphMutations = mutationType.fields.map((field) => field.name);

  return { types: subgraphTypes, queries: subgraphQueries, mutations: subgraphMutations };
};
