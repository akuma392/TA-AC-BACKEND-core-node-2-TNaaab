var http = require('http');
var qs = require('querystring');
var url = require('url');
let fs = require('fs');
function handleRequest(req, res) {
  var dataFormat = req.headers[`content-type`];

  //   console.log(req.headers, dataFormat);

  var store = '';
  req.on('data', (chunk) => {
    store += chunk;
  });
  req.on('end', () => {
    // res.writeHead(201, { 'content-type': 'application/json' });

    if (req.method == 'GET' && req.url == '/form') {
      res.writeHead(201, { 'content-type': 'text/html' });
      fs.createReadStream('./form.html').pipe(res);
    } else if (req.method == 'POST' && req.url == '/form') {
      var parsedData = qs.parse(store);
      res.writeHead(201, { 'content-type': 'text/html' });
      res.write(
        ` <h1>${parsedData.name}</h1><p>${parsedData.email}</p> <p>${parsedData.age}</p>`
      );
      res.end();
    }
  });
}

let server = http.createServer(handleRequest);
server.listen(5678, () => {
  console.log('Server is listening on port 5678');
});
