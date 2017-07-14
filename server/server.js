var express = require('express');
var request = require('request');
var bodyParser = require('body-parser')
var app = express();

const FORBIDDEN_CLIENT_HEADERS = [ 'host' ]

let removeKeys = (object, keysToRemove) => {
  var p = {};
  Object.entries(object).forEach(
    ([key, value]) => {
      if(keysToRemove.indexOf(key) == -1){
        p[key] = value;
      }
    }
  );
  return p;
}


app.use(bodyParser.raw({
  inflate: true
}));

app.use(function(req, res, next) {
  req.rawBody = '';
  req.setEncoding('utf8');

  req.on('data', function(chunk) {
    req.rawBody += chunk;
  });

  req.on('end', function() {
    next();
  });
});

app.get(/(http|https)(:)\/\/(.*)/, function (req, res) {
  var url = req.url.substr(1);
  console.log("Request url GET: " + url)
  console.log(req.url)
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Request-Method', 'GET, PATCH, PUT, POST, OPTIONS, DELETE');
  res.header('Doge', 'SUCH CORS');
  res.header('Server', 'Larousse')
  let headers = Object.assign(removeKeys(req.headers, FORBIDDEN_CLIENT_HEADERS), {});
  request(url,
  {
    headers: headers
  }).on('response', (r) => { console.log("Finished GET (" + r.statusCode + ") " + url)}).pipe(res);
});

app.post(/(http|https)(:)\/\/(.*)/, function (req, res) {
  var url = req.url.substr(1);
  console.log("Request url POST: " + url)
  console.log(req.url)
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Request-Method', 'GET, PATCH, PUT, POST, OPTIONS, DELETE');
  res.header('Doge', 'SUCH CORS');
  let headers = Object.assign(removeKeys(req.headers, FORBIDDEN_CLIENT_HEADERS), {});
  console.log(req.rawBody)
  request.post(url,
  {
    json: true,
    body: req.rawBody,
    headers: headers
  }).on('response', (r) => { console.log("Finished POST (" + r.statusCode + ") " + url)}).pipe(res);
});

app.put(/(http|https)(:)\/\/(.*)/, function (req, res) {
  var url = req.url.substr(1);
  console.log("Request url PUT: " + url)
  console.log(req.url)
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Request-Method', 'GET, PATCH, PUT, POST, OPTIONS, DELETE');
  res.header('Doge', 'SUCH CORS');
  let headers = Object.assign(removeKeys(req.headers, FORBIDDEN_CLIENT_HEADERS), {});
  console.log(req.rawBody)
  request.put(url,
  {
    json: true,
    body: req.rawBody,
    headers: headers
  }).on('response', (r) => { console.log("Finished PUT (" + r.statusCode + ") " + url)}).pipe(res);
});

app.delete(/(http|https)(:)\/\/(.*)/, function (req, res) {
  var url = req.url.substr(1);
  console.log("Request url DELETE: " + url)
  console.log(req.url)
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Request-Method', 'GET, PATCH, PUT, POST, OPTIONS, DELETE');
  res.header('Doge', 'SUCH CORS');
  let headers = Object.assign(removeKeys(req.headers, FORBIDDEN_CLIENT_HEADERS), {});
  console.log(req.rawBody)
  request.delete(url,
  {
    json: true,
    body: req.rawBody,
    headers: headers
  }).on('response', (r) => { console.log("Finished DELETE (" + r.statusCode + ") " + url)}).pipe(res);
});

app.set('port', (process.env.PORT || 5000))

app.use(express.static('public'));

app.listen(app.get('port'), function () {
  console.log('CORS Running on port 5000!');
});
