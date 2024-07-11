// server.js (or Server.js)
import express from 'express';
import http from 'http';
import { Server as SocketIO } from 'socket.io';
import cors from 'cors'; // Import CORS middleware

const app = express();
const server = http.createServer(app);
const io = new SocketIO(server);

app.use(cors()); // Enable CORS for all routes

let rooms = {};

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
    if (!rooms[roomId]) {
      rooms[roomId] = {
        board: Array(9).fill(null),
        xPlaying: true,
      };
    }
    socket.emit('updateBoard', rooms[roomId]);
  });

  socket.on('makeMove', ({ roomId, index }) => {
    if (rooms[roomId]) {
      const currentPlayer = rooms[roomId].xPlaying ? 'X' : 'O';
      if (!rooms[roomId].board[index]) {
        rooms[roomId].board[index] = currentPlayer;
        rooms[roomId].xPlaying = !rooms[roomId].xPlaying;
        io.to(roomId).emit('updateBoard', rooms[roomId]);
      }
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });

  // WebRTC signaling
  socket.on('offer', (payload) => {
    io.to(payload.target).emit('offer', payload);
  });

  socket.on('answer', (payload) => {
    io.to(payload.target).emit('answer', payload);
  });

  socket.on('ice-candidate', (payload) => {
    io.to(payload.target).emit('ice-candidate', payload);
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
