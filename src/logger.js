'use strict';

require('dotenv').config();
const net = require('net');

const PORT = process.env.PORT;
const HOST = process.env.HOST;

const messagesToLog = {
  SAVE: 'SAVE',
  ERROR: 'ERROR',
};

const socket = new net.Socket();
socket.connect(PORT, HOST, () => {
  console.log('Socket connected');

  socket.on('data', processEvent);

  socket.on('close', () => {
    console.log('Socket closed');
  });

});

const processEvent = (buffer) => {
  const messageObject = JSON.parse(buffer.toString().trim());
  let {eventType, eventMessage} = messageObject;

  if (eventType in messagesToLog) {
    console.log(eventMessage);
  }
};

