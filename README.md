# LAB - 17

## TCP Message-based Server

### Author: Jesse Van Volkinburg

### Links and Resources
* [submission PR](https://github.com/401-advanced-javascript-jv/17-TCP-message-app/pull/1)
* [travis](https://travis-ci.com/401-advanced-javascript-jv/17-TCP-message-app)
* `server` tcp :: ec2-34-219-10-23.us-west-2.compute.amazonaws.com:30010

### Setup
#### `.env` requirements
* `PORT` - Port Number
* `HOST` - hostname or IP where the server is running

#### Running the app
You'll need three separate terminals, for now.

* `npm run server` - to start the server - do this first (or connect to the running instance above)
* `npm run logger` - ro start the logger - do this second
* `npm run client <filename>` - to start the client - do this last, and will alter the given file
  
#### Tests
* `npm test` to run tests
* What assertions were made?
  * Can it read a file?
  * Can it deal with a bad file?
  * Can it convert a buffer to uppercase string?
  * Can it write a file?
* What assertions need to be / should be made?
  * Does the server listen?
  * Does the client connect?
