const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { v4: uuidv4 } = require('uuid');

// Create an Express application
const app = express();

// Create an HTTP server
const server = http.createServer(app);

// Create a WebSocket server
const wss = new WebSocket.Server({ server });

// Store rooms and their clients
const rooms = {};

// Handle WebSocket connections
wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    const data = JSON.parse(message);
    const { type, room, state, signalData } = data;

    switch (type) {
      case 'create':
        // Generate a unique room ID and create the room
        const roomId = uuidv4();
        rooms[roomId] = [ws];
        ws.send(JSON.stringify({ type: 'created', roomId }));
        break;
      case 'join':
        // Join an existing room
        if (rooms[room]) {
          rooms[room].push(ws);
          rooms[room].forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({ type: 'joined', room }));
            }
          });
        } else {
          ws.send(JSON.stringify({ type: 'error', message: 'Room not found' }));
        }
        break;
      case 'update':
        // Broadcast game state updates to all clients in the room
        if (rooms[room]) {
          rooms[room].forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({ type: 'update', state }));
            }
          });
        }
        break;
      case 'video-call':
        // Handle initiating a video call
        if (rooms[room]) {
          rooms[room].forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({ type: 'video-call', signalData }));
            }
          });
        }
        break;
      case 'accept-call':
        // Handle accepting a video call
        if (rooms[room]) {
          rooms[room].forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({ type: 'accept-call', signal: signalData }));
            }
          });
        }
        break;
      // Add more cases as needed
    }
  });

  ws.on('close', () => {
    // Remove the client from any rooms they were part of
    for (let room in rooms) {
      rooms[room] = rooms[room].filter(client => client !== ws);
    }
  });
});

// Start the server
server.listen(8080, () => {
  console.log('Server is listening on port 8080');
});
