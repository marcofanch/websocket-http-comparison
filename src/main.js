const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const socketio = require('socket.io');

const PORT = 3000;

// Set up app
const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.use('/request', (req, res) => {
  // console.debug('Got request', req.body);
  res.send('I\'ve got you');
});


// Set up HTTP server
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Benchmark app listening on port ${PORT}`);
});


// Set up socket
const io = socketio(server);

io.on('connection', (socket) => {
  // console.log('A user connected');

  socket.on('message', (message) => {
    // console.debug('Got message', message);
    socket.send('I\'ve got you');
  });
});
