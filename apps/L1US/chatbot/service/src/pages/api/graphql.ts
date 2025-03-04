import { Maybe } from '@/graphql/generated';
import { cors } from '@/utils/cors';
import { errorResponse, jsonResponse } from '@/utils/responses';
import { buildASTSchema, graphql } from 'graphql';
import { NextRequest, NextResponse } from 'next/server';
import { resolvers, typeDefs } from '@/graphql';

type GraphqlRequest = {
  query: string;
  variables?: Maybe<{
    readonly [variable: string]: unknown;
  }>;
  operationName?: Maybe<string>;
};

export const config = {
  runtime: 'edge',
};

const handler = async (req: NextRequest) => {
  let res: Response;

  if (req.method !== 'POST') {
    res = NextResponse.redirect(`https://studio.apollographql.com/sandbox/explorer?endpoint=${req.url}`, 302);
  } else {
    res = (await graphqlHandler(req)) as unknown as Response;
  }

  return cors(req, res);
};

const graphqlHandler = async (req: NextRequest) => {
  try {
    const body = (await req.json()) as GraphqlRequest;
    const { query, variables, operationName } = body;

    const response = await graphql({
      schema: buildASTSchema(typeDefs),
      source: query,
      rootValue: { ...resolvers.Mutation, ...resolvers.Query },
      variableValues: variables,
      operationName: operationName,
      contextValue: req,
    });
    return jsonResponse(response);
  } catch (e) {
    console.error(e);
    return errorResponse(400, String(e));
  }
};

export default handler;
