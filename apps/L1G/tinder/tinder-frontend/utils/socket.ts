/* eslint-disable complexity */
/* eslint-disable max-lines */
/* eslint-disable no-unused-vars */
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = 'https://socket-server-58v2.onrender.com';

// Enhanced socket configuration
export const socket: Socket = io(SOCKET_URL, {
  autoConnect: false, // Don't auto-connect, we'll manage this manually
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  timeout: 20000,
  forceNew: false,
  // transports: ['websocket', 'polling'], // Try websocket first, fallback to polling
});

// Connection state management
let isConnected = false;
let isConnecting = false;
let connectionAttempts = 0;
const maxConnectionAttempts = 10;

// Connection promise for managing async connections
let connectionPromise: Promise<void> | null = null;

// Enhanced connection manager
export const connectSocket = (): Promise<void> => {
  if (isConnected) {
    return Promise.resolve();
  }

  if (connectionPromise) {
    return connectionPromise;
  }

  connectionPromise = new Promise((resolve, reject) => {
    if (isConnecting) {
      socket.once('connect', resolve);
      socket.once('connect_error', reject);
      return;
    }

    isConnecting = true;

    const onConnect = () => {
      console.log('✅ Socket connected successfully:', socket.id);
      isConnected = true;
      isConnecting = false;
      connectionAttempts = 0;
      connectionPromise = null;

      // Clean up listeners
      socket.off('connect', onConnect);
      socket.off('connect_error', onError);
      socket.off('disconnect', onDisconnect);

      resolve();
    };

    const onError = (error: Error) => {
      console.error('❌ Socket connection error:', error);
      connectionAttempts++;
      isConnecting = false;

      if (connectionAttempts >= maxConnectionAttempts) {
        connectionPromise = null;
        socket.off('connect', onConnect);
        socket.off('connect_error', onError);
        socket.off('disconnect', onDisconnect);
        reject(new Error(`Failed to connect after ${maxConnectionAttempts} attempts`));
        return;
      }

      // Retry with exponential backoff
      const delay = Math.min(1000 * Math.pow(2, connectionAttempts - 1), 5000);
      setTimeout(() => {
        if (!isConnected) {
          socket.connect();
        }
      }, delay);
    };

    const onDisconnect = (reason: string) => {
      console.log('🔌 Socket disconnected:', reason);
      isConnected = false;
      isConnecting = false;

      if (reason === 'io server disconnect') {
        // Server initiated disconnect, don't try to reconnect automatically
        connectionPromise = null;
        socket.off('connect', onConnect);
        socket.off('connect_error', onError);
        socket.off('disconnect', onDisconnect);
        reject(new Error('Server disconnected'));
      }
    };

    // Set up event listeners
    socket.on('connect', onConnect);
    socket.on('connect_error', onError);
    socket.on('disconnect', onDisconnect);

    // Initiate connection
    socket.connect();
  });

  return connectionPromise;
};

// Graceful disconnect
export const disconnectSocket = (): void => {
  if (socket.connected) {
    socket.disconnect();
  }
  isConnected = false;
  isConnecting = false;
  connectionAttempts = 0;
  connectionPromise = null;
};

// Check connection status
export const isSocketConnected = (): boolean => {
  return socket.connected && isConnected;
};

// Enhanced emit with connection check and retry
export const emitWithRetry = async (event: string, data: any, timeout = 5000): Promise<any> => {
  // Ensure connection
  if (!isSocketConnected()) {
    try {
      await connectSocket();
    } catch (error) {
      throw new Error(`Failed to connect socket before emitting ${event}`);
    }
  }

  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error(`Socket emit timeout for event: ${event}`));
    }, timeout);

    try {
      // For events that expect acknowledgment
      if (['authenticate', 'chat_message', 'messages_seen'].includes(event)) {
        socket.emit(event, data, (response: any) => {
          clearTimeout(timeoutId);
          if (response?.error) {
            reject(new Error(response.error));
          } else {
            resolve(response);
          }
        });
      } else {
        // Fire and forget events
        socket.emit(event, data);
        clearTimeout(timeoutId);
        resolve(undefined);
      }
    } catch (error) {
      clearTimeout(timeoutId);
      reject(error);
    }
  });
};

// Enhanced event listener management
const eventListeners = new Map<string, ((...args: any[]) => void)[]>();

export const addSocketListener = (event: string, callback: (...args: any[]) => void): void => {
  if (!eventListeners.has(event)) {
    eventListeners.set(event, []);
  }

  eventListeners.get(event)?.push(callback);
  socket.on(event, callback);
};

export const removeSocketListener = (event: string, callback: (...args: any[]) => void): void => {
  const listeners = eventListeners.get(event);
  if (listeners) {
    const index = listeners.indexOf(callback);
    if (index > -1) {
      listeners.splice(index, 1);
    }
  }

  socket.off(event, callback);
};

export const removeAllSocketListeners = (event?: string): void => {
  if (event) {
    socket.removeAllListeners(event);
    eventListeners.delete(event);
  } else {
    socket.removeAllListeners();
    eventListeners.clear();
  }
};

// Connection health monitoring
export const startConnectionMonitoring = (): void => {
  const pingInterval = setInterval(() => {
    if (isSocketConnected()) {
      socket.emit('ping', { timestamp: Date.now() });
    }
  }, 30000); // Ping every 30 seconds

  socket.on('pong', (data) => {
    const latency = Date.now() - data.timestamp;
    console.log(`📡 Socket latency: ${latency}ms`);
  });

  // Clean up on disconnect
  socket.on('disconnect', () => {
    clearInterval(pingInterval);
  });
};

// Socket state utilities
export const getSocketInfo = () => ({
  id: socket.id,
  connected: socket.connected,
  url: SOCKET_URL,
  transport: socket.io.engine?.transport?.name,
  connectionAttempts,
  isConnecting,
});

// Enhanced logging for development
if (process.env.NODE_ENV === 'development') {
  socket.onAny((event, ...args) => {
    console.log(`🔄 Socket event: ${event}`, args);
  });

  socket.on('connect', () => {
    console.log('✅ Socket connected:', getSocketInfo());
    startConnectionMonitoring();
  });

  socket.on('disconnect', (reason) => {
    console.log('❌ Socket disconnected:', reason);
  });

  socket.on('connect_error', (error) => {
    console.error('❌ Socket connection error:', error.message);
  });

  socket.on('reconnect', (attemptNumber) => {
    console.log('🔄 Socket reconnected after', attemptNumber, 'attempts');
  });

  socket.on('reconnect_attempt', (attemptNumber) => {
    console.log('🔄 Socket reconnection attempt:', attemptNumber);
  });

  socket.on('reconnect_error', (error) => {
    console.error('❌ Socket reconnection error:', error.message);
  });

  socket.on('reconnect_failed', () => {
    console.error('❌ Socket reconnection failed - max attempts reached');
  });
}

export default socket;
 