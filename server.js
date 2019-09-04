//listens to the port when client intiates http request and connects to /backend/app.js
const http = require('http');
const app = require('./backend/app');

const port = process.env.PORT || 3000;
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
