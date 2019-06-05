'use strict';

let app = require('../src/app.js');
jest.mock('fs');

let {
  readFileContents,
  readRejectMessage,
  writeMessage,
} = require('../__mocks__/fs.js');

describe('app functions', () => {
  it('can read a file', () => {
    return app
      .readFile('./test.txt')
      .then((data) => {
        expect(data.toString().trim()).toEqual(readFileContents);
      })
      .catch((error) => expect(error).toBeUndefined());
  });

  it('can deal with a bad file', () => {
    return app
      .readFile('bad.txt')
      .then((data) => {
        expect(data).toBeUndefined();
      })
      .catch((error) => expect(error.message).toContain(readRejectMessage));
  });

  it('can modify a Buffer containing a string to make the string uppercase, and returns a Buffer', () => {
    let string = 'input string';
    let inBuffer = Buffer.from(string);
    let outBuffer = Buffer.from(string.toUpperCase());

    expect(app.modifyContents(inBuffer)).toEqual(outBuffer);
  });

  it('can write a file', () => {
    const outBuffer = Buffer.from('CONTENTS');
    const filename = 'filename';

    return app.writeFile(filename, outBuffer).then((mockModuleOutput) => {
      expect(mockModuleOutput.message).toEqual(writeMessage);
      expect(mockModuleOutput.inputs.file).toEqual(filename);
      expect(mockModuleOutput.inputs.data).toEqual(outBuffer);
    });

  });
});
