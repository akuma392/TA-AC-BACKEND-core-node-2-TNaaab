var http = require('http');
var qs = require('querystring');
var url = require('url');
let fs = require('fs');
const userDir = __dirname + '/users/';
function handleRequest(req, res) {
  var dataFormat = req.headers[`content-type`];

  //   console.log(req.headers, dataFormat);

  var store = '';
  req.on('data', (chunk) => {
    store += chunk;
  });
  req.on('end', () => {
    if (req.url === '/users' && req.method === 'POST') {
      var username = JSON.parse(store).username;
      fs.open(userDir + username + '.json', 'wx', (err, fd) => {
        fs.writeFileSync(userDir + username + '.json', store);
      });
      res.end('User has created');
    }

    else if(req.url === '/users' && req.method === 'POST')
  });
}

let server = http.createServer(handleRequest);
server.listen(2222, () => {
  console.log('Server is listening on port 2222');
});
