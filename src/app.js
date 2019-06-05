'use strict';

require('dotenv').config();
const fs = require('fs').promises;
const net = require('net');

const PORT = process.env.PORT;
const HOST = process.env.HOST || 'localhost';

const socket = new net.Socket();
socket.connect(PORT, HOST, () => {
  console.log('Socket connected');
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
  readFile(file)
    .then((data) => {
      return writeFile(modifyContents(data));
    })
    .then(() => {
      socket.write(`SAVE:${file} written`);
    })
    .catch((error) => {
      socket.write('ERROR:' + error);
    });
};

const file = process.argv[2];
alterFile(file);

module.exports = exports = { readFile, modifyContents, writeFile };
