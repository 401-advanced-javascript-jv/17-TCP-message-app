'use strict';

require('dotenv').config();
const net = require('net');

const PORT = process.env.PORT;
const HOST = process.env.HOST || 'localhost';

const socket = new net.Socket();

const {readFile, modifyContents, writeFile} = require('./alter.js');

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
