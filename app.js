'use strict';

const fs = require('fs').promises;

const readFile = (file) => {
  return fs.readFile(file).catch((error) => {
    throw error;
  });
};

const modifyContents = (data) => {
  let text = data.toString();
  let upperText = text.toUpperCase();
  let buffer = Buffer.from(upperText);
  return buffer;
};

const writeFile = (filename, buffer) => {
  return fs.writeFile(filename, buffer).catch((error) => {
    throw error;
  });
};

const alterFile = (file) => {
  readFile(file)
    .then((data) => {
      let outBuffer = modifyContents(data);
      return writeFile();
    })
    .then(() => {
      console.log(`${file} saved`);
    })
    .catch((error) => {
      throw error;
    });
};

let file = process.argv.slice(2).shift();
alterFile(file);

module.exports = exports = {readFile, modifyContents, writeFile};
