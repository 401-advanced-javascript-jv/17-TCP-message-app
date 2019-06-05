'use strict';

require('dotenv').config();
const fs = require('fs').promises;
const net = require('net');

const PORT = process.env.PORT;
const HOST = process.env.HOST || 'localhost';

const socket = new net.Socket();

socket.connect(PORT, HOST, () => {
  console.log('Socket connected');

  socket.on('close', () => {
    console.log('Socket closed');
  });

  const file = process.argv[2];
  alterFile(file)
    .then(() => {
      console.log('Closing connection...');
      socket.end();
    })
    .catch((error) => {
      socket.write('ERROR:' + error);
    });
});

const readFile = (file) => {
  return fs.readFile(file);
};

const modifyContents = (data) => {
  let text = data.toString();
  let upperText = text.toUpperCase();
  return Buffer.from(upperText);
};

const writeFile = (filename, buffer) => {
  return fs.writeFile(filename, buffer);
};

const alterFile = (file) => {
  return readFile(file)
    .then((data) => {
      return writeFile(file, modifyContents(data));
    })
    .then(() => {
      return Promise.resolve(socket.write(`SAVE:${file} written`));
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

module.exports = exports = { readFile, modifyContents, writeFile };
