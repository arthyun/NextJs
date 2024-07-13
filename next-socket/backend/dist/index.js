"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const express = require('express');
const app = express();
const cors = require('cors');
const httpServer = (0, http_1.createServer)();
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
const wsServer = new socket_io_1.Server(httpServer, {
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
