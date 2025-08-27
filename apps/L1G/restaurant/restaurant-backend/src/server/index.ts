// src/server/index.ts
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { createNotification, markAsSeen, getNotifications, getUnreadCount } from './notification';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: '*' },
});

// REST endpoints (GraphQL query/mutation-ийн оронд)
app.get('/notifications/:userId', (req, res) => {
  const userId = req.params.userId;
  res.json({ notifications: getNotifications(userId), unreadCount: getUnreadCount(userId) });
});

app.post('/notifications/mark-seen/:id', (req, res) => {
  const notif = markAsSeen(req.params.id);
  res.json({ notification: notif });
});

// Socket.IO
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('subscribe', (userId: string) => {
    socket.join(userId); // хэрэглэгч тусдаа room-д оруулна
  });

  socket.on('createNotification', ({ userId, message }: { userId: string; message: string }) => {
    const notif = createNotification(userId, message);
    io.to(userId).emit('notificationReceived', notif); // зөвхөн тухайн user руу явуулна
  });

  socket.on('markAsSeen', (id: string) => {
    const notif = markAsSeen(id);
    if (notif) {
      io.to(notif.userId).emit('notificationUpdated', notif); // хэрэглэгчид update мэдэгдэл
    }
  });
});

server.listen(4000, () => {
  console.log('Server running on http://localhost:4000');
});
