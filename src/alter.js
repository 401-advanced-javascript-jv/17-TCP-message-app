'use strict';

const fs = require('fs').promises;

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

module.exports = {readFile, modifyContents, writeFile};
