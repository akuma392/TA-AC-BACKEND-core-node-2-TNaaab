var http = require('http');
var qs = require('querystring');
var url = require('url');
function handleRequest(req, res) {
  var dataFormat = req.headers[`content-type`];

  //   console.log(req.headers, dataFormat);

  var store = '';
  req.on('data', (chunk) => {
    store += chunk;
  });
  req.on('end', () => {
    // res.writeHead(201, { 'content-type': 'application/json' });

    if (req.method == 'POST' && req.url == '/') {
      res.writeHead(201, { 'content-type': 'application/json' });
      var parsedData = qs.parse(store);
      res.end(JSON.stringify(parsedData));
    }
  });
}

let server = http.createServer(handleRequest);
server.listen(7080, () => {
  console.log('Server is listening on port 7080');
});
