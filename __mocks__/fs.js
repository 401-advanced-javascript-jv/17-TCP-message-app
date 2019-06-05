'use strict';

module.exports = exports = {
  readRejectMessage: 'Invalid File',
  readFileContents: 'File Contents',
  writeMessage: 'File Written',

  promises: {
    readFile: (file) => {
      if (file.match(/bad/i)) {
        return Promise.reject(exports.readRejectMessage);
      } else {
        return Promise.resolve(Buffer.from(exports.readFileContents));
      }
    },

    writeFile: (file, data) => {
      return Promise.resolve({
        message: exports.writeMessage,
        inputs: { file, data },
      });
    },
  },
};
