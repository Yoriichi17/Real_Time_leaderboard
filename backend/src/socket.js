const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');

const createServerWithSocket = () => {
  // Create HTTP server using the Express app
  const server = http.createServer(app);

  // Attach Socket.IO to the server with CORS enabled
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  // Handle socket connections
  const setupSocketIO = (ioInstance) => {
    ioInstance.on('connection', (socket) => {
      console.log(`Client connected: ${socket.id}`);

      socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
      });
    });
  };

  setupSocketIO(io);

  // Make io accessible from the Express app
  app.set('io', io);

  return { server };
};

module.exports = createServerWithSocket;
