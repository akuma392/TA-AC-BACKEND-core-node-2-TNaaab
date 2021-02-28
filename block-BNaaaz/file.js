var http = require('http');
let fs = require('fs');
function handleRequest(req, res) {
  if (req.method === 'GET') {
    res.writeHead(201, { 'content-type': 'text/plain' });
    fs.createReadStream('./readme.txt').pipe(res);
  }
}
let server = http.createServer(handleRequest);

server.listen(4000, () => {
  console.log('Server is running on 4000');
});
