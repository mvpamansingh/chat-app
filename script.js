const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  // You might serve a basic HTML file to test connections if required
  res.send('server running at 3000...huiii')
});

io.on('connection', (socket) => {
  console.log('Client connected: ', socket.id);

  socket.on('sendMessage', (message) => {
    
    io.emit('receiveMessage', message); // Broadcast message to all clients 
    socket.emit('messageReceived', { messageId: message}); 
    console.log('Message received from client:', message); // Add logging

    res.send(message)
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected: ', socket.id);
  });
});

http.listen(3000, () => {
  console.log('Server listening on port 3000');
});
