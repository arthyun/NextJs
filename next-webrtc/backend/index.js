"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors = require('cors');
const http_1 = require("http");
const socket_io_1 = require("socket.io");
/* variables */
const httpServer = (0, http_1.createServer)(app);
const wsServer = new socket_io_1.Server(httpServer, {
    cors: {
        origin: 'http://localhost:3000',
        credentials: true,
        methods: ['GET', 'POST']
    }
});
/* app setting */
app.set('port', 4000);
app.use(cors({
    origin: '*'
}));
app.get('/', (req, res) => {
    return res.json({ status: 200, message: 'ok' });
});
/* socket setting */
wsServer.on('connection', (socket) => {
    console.log('Success Connected wsServer!');
    // 이벤트 감지
    socket.onAny((event) => {
        console.log('발생 이벤트 : ', event);
    });
    // 방 입장 후 RTC Offer 생성
    socket.on('join_room', (roomName) => {
        socket.join(roomName);
        socket.to(roomName).emit('welcome'); // offer 생성부
    });
    // RTC Offer 받고 전달하기
    socket.on('offer', (offer, roomName) => {
        socket.to(roomName).emit('offer', offer, roomName);
    });
    // 클라이언트에서 전달받은 answer를 모든 방에 뿌려줌
    socket.on('answer', (answer, roomName) => {
        socket.to(roomName).emit('answer', answer, roomName);
    });
    // iceCandidate를 수신하는 이벤트 (타겟은 모든방임)
    socket.on('ice', (ice, roomName) => {
        console.log(ice, roomName);
        // socket.to(roomName).emit('ice', ice);
    });
    // 연결 끊는중
    socket.on('disconnecting', () => console.log('disconnecting socket'));
    // 연결 끊음
    socket.on('disconnect', () => console.log('disconnect socket'));
});
httpServer.listen(app.get('port'), () => console.log('Welcome httpServer!'));
