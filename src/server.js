'use strict';

require('dotenv').config();
const net = require('net');

const PORT = process.env.PORT;
const server = net.createServer();

server.listen(PORT, () => console.log(`Server up on ${PORT}`));

let socketPool = {};

server.on('connection', (socket) => {
  const id = `Socket-${Math.random()}`;
  socketPool[id] = socket;

  socket.on('data', (buffer) => dispatchEvent(buffer));

  socket.on('close', () => {
    delete socketPool[id];
  });
});

let dispatchEvent = (buffer) => {
  // the following three lines are not strictly necessary, just demonstrating how
  // to split type and payload/message
  const text = buffer.toString().trim();
  const [eventType, eventMessage] = text.split(':');
  const messageToSend = { eventType, eventMessage };

  for (const socket in socketPool) {
    socketPool[socket].write(JSON.stringify(messageToSend));
  }
};
