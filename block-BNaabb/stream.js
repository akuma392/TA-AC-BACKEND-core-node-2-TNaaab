var http = require('http');
var fs = require('fs');
var url = require('url');
function handleRequest(req, res) {
  var store = '';
  req.on('data', (chunk) => {
    store += chunk;
  });
  req.on('end', () => {
    res.writeHead(201, { 'content-type': 'application/json' });
    res.write(store);
    res.end();
  });
}

let server = http.createServer(handleRequest);
server.listen(3456, () => {
  console.log('Server is listening on port 3456');
});
