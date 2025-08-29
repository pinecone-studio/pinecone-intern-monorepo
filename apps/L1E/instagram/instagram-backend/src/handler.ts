import { NextRequest, NextResponse } from 'next/server';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { resolvers } from './resolvers';
import { typeDefs } from './schemas';
import { getJwtSecret } from './utils/check-jwt';
import jwt from "jsonwebtoken";
import { connectToDb } from './utils/connect-to-db';
import 'dotenv/config';
 
connectToDb();
 
const server = new ApolloServer({
  resolvers,
  typeDefs,
  introspection: true,
  csrfPrevention: false,
});
 
 
const apolloHandler = startServerAndCreateNextHandler(server, {
  context: async (req: any) => {
    console.log("=== APOLLO CONTEXT CALLED ===");
    console.log("Request object:", req);
   
    try {
      if (!req || !req.headers) {
        console.log("No valid request object with headers");
        return { userId: null };
      }
     
      // Debug: Log all headers
      console.log("All headers:", Object.fromEntries(req.headers.entries()));
     
      const authHeader = req.headers.get("authorization") || req.headers.get("Authorization");
      console.log("Auth header found:", authHeader);
     
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.log("No valid auth header");
        return { userId: null };
      }
      const token = authHeader.replace("Bearer ", "");
      console.log("Token extracted:", token.substring(0, 20) + "...");
     
      const decoded = jwt.verify(token, getJwtSecret()) as { userId?: string };
      console.log("Decoded userId:", decoded?.userId);
     
      return { userId: decoded?.userId  };
    } catch (err) {
      console.error('Context token error:', err);
      return { userId: null };
    }
  },
});
 
 
export async function handler(req: NextRequest) {
  console.log("=== BACKEND REQUEST RECEIVED ===");
  console.log("Method:", req.method);
  console.log("URL:", req.url);
  console.log("All headers in main handler:", Object.fromEntries(req.headers.entries()));
 
  if (req.method === 'OPTIONS') {
    console.log("Handling OPTIONS request");
    return new NextResponse(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }
 
  console.log("Calling apolloHandler...");
  const response = await apolloHandler(req);
  console.log("Apollo handler completed");
 
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
 
  return response;
}