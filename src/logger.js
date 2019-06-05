'use strict';

require('dotenv').config();
const net = require('net');

const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || 'localhost';

const messagesToLog = {
  SAVE: 'SAVE',
  ERROR: 'ERROR',
};

const socket = new net.Socket();
socket.connect(PORT, HOST, () => {
  console.log('Socket connected');
});

socket.on('data', (buffer) => {
  const text = buffer.toString().trim();
  const [eventType, eventMessage] = text.split(':');

  if (eventType in messagesToLog) {
    console.log(eventMessage);
  }
});

socket.on('close', () => {
  console.log('Socket closed');
});
