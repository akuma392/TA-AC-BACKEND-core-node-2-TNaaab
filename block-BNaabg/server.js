var http = require('http');
var qs = require('querystring');
var url = require('url');
let fs = require('fs');
const userDir = __dirname + '/users/';

function handleRequest(req, res) {
  var dataFormat = req.headers[`content-type`];
  var parsedUrl = url.parse(req.url, true);
  //   console.log(req.headers, dataFormat);

  var store = '';
  req.on('data', (chunk) => {
    store += chunk;
  });
  req.on('end', () => {
    if (req.url === '/users' && req.method === 'POST') {
      let username = JSON.parse(store).username;
      fs.open(userDir + username + '.json', 'wx', (err, fd) => {
        if (err) return console.log(err);

        fs.writeFile(fd, store, (err) => {
          if (err) return console.log(err);

          fs.close(fd, () => {
            res.end(`${username} has created`);
          });
        });
      });
    } else if (parsedUrl.pathname === '/users' && req.method == 'GET') {
      let username = parsedUrl.query.username;
      fs.readFile(userDir + username + '.json', (err, content) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(content);
      });
    } else if (parsedUrl.pathname == '/users' && req.method == 'PUT') {
      let username = parsedUrl.query.username;
      fs.open(userDir + username + '.json', 'r+', (err, fd) => {
        if (err) {
          return console.log(err);
        }
        fs.ftruncate(fd, (err) => {
          if (err) {
            return console.log(err);
          }
          fs.writeFile(fd, store, (err) => {
            if (err) {
              return console.log(err);
            }
            fs.close(fd, () => {
              res.end(`${username} updated successfully`);
            });
          });
        });
      });
    } else if (parsedUrl.pathname == '/users' && req.method == 'DELETE') {
      let username = parsedUrl.query.username;
      fs.unlink(userDir + username + '.json', (err) => {
        if (err) {
          return console.log(err);
        }
        res.end(`${username} is deleted`);
      });
    } else {
      res.statusCode = 403;
      res.end('Page not found');
    }
  });
}

let server = http.createServer(handleRequest);
server.listen(2224, () => {
  console.log('Server is listening on port 2224');
});
