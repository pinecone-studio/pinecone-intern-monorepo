import { io } from 'socket.io-client';
const SOCKET_URL = 'https://socket-server-58v2.onrender.com';

export const socket = io(SOCKET_URL, {
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  timeout: 20000,
});

socket.on('connect', () => {
  console.log('✅ Connected to Socket.IO server:', socket.id);
});

socket.on('connect_error', (err) => {
  console.error('❌ Socket connection error:', err);
});
