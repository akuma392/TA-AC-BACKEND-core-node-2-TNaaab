## BLOCK-writeCode

#### Path

Q. Suppose we have 3 files inside a directory on desktop
The structure is

- node(folder) - app.js - server.js - index.html
  You are currently inside server.js

Write code to

- capture absolute path of `server.js`(itself)
- get absolute path of `app.js`
- get realtive path of `index.html`
- get absolute path of `index.html` using `path module`

```js
console.log(__filename);
// ./app.js
let path = require('path');

let pathName = path.join(__dirname, './index.html');
console.log(pathName);
```

#### Capture data on server

Q. Create a server using http

- handle post method on '/' route
- send json data on it from postman

```js
// data format is
{
  team: 'kxip',
  players: 18,
  captain: 'KL Rahul'
}
```

- capture data from request on server side using data and end event on request object
- when end event fires, send entire captured data in response with status code 201.

```js
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
      res.end(store);
    }
  });
}

let server = http.createServer(handleRequest);
server.listen(7080, () => {
  console.log('Server is listening on port 7080');
});
```

Q. Follow above steps with form data from postman instead of json data.

- once data has been captured, send only captain's name in response.

Q. Create server which can handle both json/form data without specifying which format of data is being received.

- add listener on port 9000
- use `data/end` event to capture json/form data
- use `req.headers['Content-Type']` to check data format
- parse respective data format i.e. json/form
- send entire data in response
- data sent from postman should have fields:
  - city
  - state
  - country
  - pin

```js
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

    if (dataFormat == 'application/json') {
      res.end(store);
    }
    if (dataFormat == 'application/x-www-form-urlencoded') {
      var parsedData = qs.parse(store);
      res.end(JSON.stringify(parsedData));
    }
  });
}

let server = http.createServer(handleRequest);
server.listen(7080, () => {
  console.log('Server is listening on port 7080');
});
```

Q. create server, send json data in request from postman, parse in on the server and send html response with entire parsed data information.

- format of json data is {name: your name, email: "", }
- Html response format is <h1>Name</h1><h2>email</h2>

```js
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

    if (dataFormat == 'application/json') {
      res.writeHead(201, { 'content-type': 'text/html' });
      res.write(` <h1>${store.name}</h1><h2>${store.email}</h2>`);
      res.end();
    }
    if (dataFormat == 'application/x-www-form-urlencoded') {
      res.writeHead(201, { 'content-type': 'text/html' });
      var parsedData = qs.parse(store);
      res.write(` <h1>${store.name}</h1><h2>${store.email}</h2>`);
      res.end();
    }
  });
}

let server = http.createServer(handleRequest);
server.listen(7080, () => {
  console.log('Server is listening on port 7080');
});
```

Q. Follow above question with form data containing fields i.e name and email.

- Parse form-data using `querystring` module
- respond with HTML page containing only email from data in H2 tag.

#### Note:-

Make sure to convert objects into strings using `JSON.stringify` before passing the data through response.
