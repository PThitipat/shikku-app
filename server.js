const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const next = require('next');
const cron = require('node-cron');
const fetch = require('node-fetch');
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

cron.schedule('*/5 * * * *', async () => {
  console.log('Running status update job...');
  try {
    const response = await fetch(`${API_URL}/api/updateStatus`, {
      method: "POST",
    });    
    const result = await response.json();
    console.log('Update result:', result);
  } catch (error) {
    console.error('Error updating status:', error);
  }
});


app.prepare().then(() => {
  const server = express();
  const httpServer = createServer(server);
  const io = new Server(httpServer, {
    cors: {
      origin: '*',
    },
  });


  io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  global.io = io;

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  const PORT = process.env.PORT || 3000;
  httpServer.listen(PORT, () => {
    console.log(`> Ready on ${API_URL}:${PORT}`);
  });
});