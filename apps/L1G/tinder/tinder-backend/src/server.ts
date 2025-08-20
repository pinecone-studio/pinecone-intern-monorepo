import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { typeDefs } from './schemas';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { resolvers } from './resolvers';
import connectToDB from './utils/connect-to-db';
import { Context } from './types';
import dotenv from 'dotenv';
import { NextRequest } from 'next/server';
import { ChatMessageModel } from './models/chat-message';

dotenv.config();

// Step 1: Initialize Express and HTTP server
const app = express();
const server = http.createServer(app);

// Step 2: Set up Socket.IO server (WebSocket communication)
const io = new SocketIOServer(server, {
  cors: {
    origin: '*',
  },
});

// Step 3: Set up Apollo Server for GraphQL
const apolloServer = new ApolloServer<Context>({
  resolvers,
  typeDefs,
  introspection: true,
});

// Step 4: Connect to DB and start the server
connectToDB()
  .then(() => {
    io.on('connection', (socket) => {
      console.log('User connected:', socket.id);

      socket.on('join', (matchId) => {
        socket.join(matchId);
        console.log(`User joined match room ${matchId}`);
      });

      socket.on('send_message', async ({ matchId, senderId, receiverId, content }) => {
        const message = await new ChatMessageModel({
          matchId,
          senderId,
          receiverId,
          content,
        }).save();

        io.to(matchId).emit('receive_message', {
          id: message._id.toString(),
          senderId,
          receiverId,
          content,
          createdAt: message.createdAt,
          seen: false,
        });
      });

      socket.on('disconnect', () => {
        console.log('User disconnected');
      });
    });

    // Step 5: Set up Apollo server as middleware for GraphQL
    apolloServer.start().then(() => {
      app.use(
        '/api/graphql',
        expressMiddleware(apolloServer, {
          context: async ({ req }) => {
            const authHeader = req.headers['authorization'] || '';
            const token = extractToken(authHeader);
            const userId = await verifyUserId(token);
            return { userId };
          },
        })
      );

      // Step 6: Start the HTTP server for both Express and Socket.IO
      const PORT = process.env.PORT || 4000;
      server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    });
  })
  .catch((err) => {
    console.error('Failed to start the server:', err);
    process.exit(1);
  });

function extractToken(authHeader: string): string {
  return authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
}

function ensureJwtSecret(): string {
  if (!process.env.JWT_SECRET) {
    return 'tinder';
  }
  return process.env.JWT_SECRET;
}

function decodeToken(token: string, secret: string): JwtPayload | null {
  try {
    return jwt.verify(token, secret) as JwtPayload;
  } catch (err) {
    console.warn('Invalid or missing JWT:', err);
    return null;
  }
}

function extractUserId(decoded: JwtPayload | null): string | undefined {
  return decoded && decoded.userId ? decoded.userId : undefined;
}

async function verifyUserId(token: string): Promise<string | undefined> {
  const secret = ensureJwtSecret();
  const decoded = decodeToken(token, secret);
  return extractUserId(decoded);
}

// Step 7: Use `startServerAndCreateNextHandler` for Next.js API routes
export const handler = startServerAndCreateNextHandler<NextRequest, Context>(apolloServer, {
  context: async (req) => {
    const authHeader = req.headers.get('authorization') || '';
    const token = extractToken(authHeader);
    const userId = await verifyUserId(token);
    return { userId };
  },
});
