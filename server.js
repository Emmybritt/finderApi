const http = require('http');
const app = require('./index');
require('dotenv').config();
const server = http.createServer(app);
server.listen(process.env.PORT);
console.log('server running in port', process.env.PORT);