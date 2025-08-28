// socket-server.ts
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:4201',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('🔌 Client connected:', socket.id);
  
  // Join room
  socket.on('join room', (matchId: string) => {
    socket.join(matchId);
    console.log(`📥 Socket ${socket.id} joined room ${matchId}`);
  });

  // Handle message
  socket.on('chat message', (msg) => {
    const { matchId, content, senderId, receiverId } = msg;

    console.log(`📨 Message in room ${matchId}: ${content}`);

    // Emit only to room (i.e. sender + receiver)
    io.to(matchId).emit('chat message', msg);
  });
  //Leave
  socket.on('leave room', (matchId: string) => {
    socket.leave(matchId);
    console.log(`📤 Socket ${socket.id} left room ${matchId}`);
  });

  // Disconnect
  socket.on('disconnect', () => {
    console.log('🔌 Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
  console.log(`🚀 Socket.IO server running on port ${PORT}`);
});
