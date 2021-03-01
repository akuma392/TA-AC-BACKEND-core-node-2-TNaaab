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

    if (dataFormat == 'application/json' && req.url == '/json') {
      res.end(store);
    }
    if (
      dataFormat == 'application/x-www-form-urlencoded' &&
      req.url == '/form'
    ) {
      var parsedData = qs.parse(store);
      res.end(JSON.stringify(parsedData));
      //   res.end(JSON.stringify(store));
    }
  });
}

let server = http.createServer(handleRequest);
server.listen(7000, () => {
  console.log('Server is listening on port 7000');
});
