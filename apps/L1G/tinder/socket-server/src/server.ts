import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});
app.get('/', (req, res) => {
  res.send('Socket server is running!');
});

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('chat message', (msg: string) => {
    console.log('Message:', msg);
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
  console.log(`Socket.IO server running on port http://localhost:${PORT}`);
});
