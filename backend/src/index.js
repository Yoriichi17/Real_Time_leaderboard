const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env

const createServerWithSocket = require('./socket');

const PORT = process.env.PORT || 5000;

// Create HTTP + Socket.IO server
const { server } = createServerWithSocket();

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
