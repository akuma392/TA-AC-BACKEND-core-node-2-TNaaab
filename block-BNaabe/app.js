var http = require('http');
var qs = require('querystring');
var url = require('url');
function handleRequest(req, res) {
  var dataFormat = req.headers[`content-type`];

  //   console.log(req.headers, dataFormat);
  console.log(dataFormat);
  var store = '';
  req.on('data', (chunk) => {
    store += chunk;
  });
  req.on('end', () => {
    // res.writeHead(201, { 'content-type': 'application/json' });

    if (dataFormat == 'application/json') {
      var parsed = JSON.parse(store);
      res.writeHead(201, { 'content-type': 'text/html' });

      res.end(`<h1>${parsed.name}</h1><h2>${parsed.email}</h2>`);
    }
    if (dataFormat == 'application/x-www-form-urlencoded') {
      var parsedData = qs.parse(store);
      res.writeHead(201, { 'content-type': 'text/html' });
      res.write(` <h1>${parsedData.Name}</h1><h2>${parsedData.email}</h2>`);
      res.end();
    }
  });
}

let server = http.createServer(handleRequest);
server.listen(7080, () => {
  console.log('Server is listening on port 7080');
});
