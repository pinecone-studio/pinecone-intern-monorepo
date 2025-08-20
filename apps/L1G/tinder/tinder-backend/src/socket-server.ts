import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import dotenv from 'dotenv';
import connectToDB from './utils/connect-to-db';
import { ChatMessageModel } from './models/chat-message';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: { origin: '*' },
});

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

      socket.on('disconnect', () => console.log('User disconnected'));
    });

    const PORT = process.env.PORT || 4000;
    server.listen(PORT, () => console.log(`Socket.IO server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Failed to start Socket.IO server:', err);
    process.exit(1);
  });
