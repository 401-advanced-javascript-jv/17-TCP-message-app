'use strict';

const net = require('net');

const port = process.env.PORT || 3001;
const server = net.createServer();

server.listen(port, () => console.log(`Server up on ${port}`) );

let socketPool = {};

server.on('connection', (socket) => {
  const id = `Socket-${Math.random()}`;
  socketPool[id] = socket;

  socket.on('data', (buffer) => dispatchEvent(buffer));
  socket.on('close', () => {
    delete socketPool[id];
  });
  socket.on('error', (payload) => {
    console.log(payload);
  });
});

let dispatchEvent = (buffer) => {
  const text = buffer.toString().trim();
  const [eventType,eventMessage] = text.split(':');
  const messageToSend = {eventType, eventMessage};
  for (const socket in socketPool) {
    socketPool[socket].write(JSON.stringify(messageToSend));
  }
};


