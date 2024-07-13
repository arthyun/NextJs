import { Server } from 'socket.io';
import { createServer } from 'http';
const express = require('express');
const app = express();
const cors = require('cors');
const httpServer = createServer();

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true
  })
);

const wsServer = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET, POST']
  }
});

wsServer.on('connection', (socket) => {
  console.log(socket);
});

httpServer.listen(4000, () => console.log('Server Connecting... 4000'));
