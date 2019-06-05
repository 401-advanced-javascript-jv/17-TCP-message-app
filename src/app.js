'use strict';

require('dotenv').config();
const fs = require('fs').promises;
const net = require('net');

const PORT = process.env.PORT;
const HOST = process.env.HOST;

const socket = new net.Socket();
socket.connect(PORT, HOST, () => {
  console.log('Socket connected');
});

const readFile = (file) => {
  return fs.readFile(file).catch((error) => {
    socket.emit('error', error);
  });
};

const modifyContents = (data) => {
  let text = data.toString();
  let upperText = text.toUpperCase();
  return Buffer.from(upperText);
};

const writeFile = (filename, buffer) => {
  return fs.writeFile(filename, buffer).then(() => {
    socket.write('SUCCESS:File Written');
  }).catch((error) => {
    socket.emit('error', error);
  });
};

module.exports = exports = { readFile, modifyContents, writeFile };
