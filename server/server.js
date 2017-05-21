var express = require('express');
var request = require('request');
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

app.get(/(http|https)(:)\/\/(.*)/, function (req, res) {
  var url = req.url.substr(1);
  console.log("Request url GET: " + url)
  console.log(req.url)
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Request-Method', 'GET, PATCH, PUT, POST, OPTIONS, DELETE');
  res.header('Doge', 'SUCH CORS');
  let headers = Object.assign(removeKeys(req.headers, FORBIDDEN_CLIENT_HEADERS), {});
  request(url,
  {
    headers: headers
  }).on('response', (r) => { console.log("Finished GET (" + r.statusCode + ") " + url)}).pipe(res);
});

app.post(/(http|https)(:)\/\/(.*)/, function (req, res) {
  var url = req.url.substr(1);
  console.log("Request url GET: " + url)
  console.log(req.url)
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Request-Method', 'GET, PATCH, PUT, POST, OPTIONS, DELETE');
  res.header('Doge', 'SUCH CORS');
  let headers = Object.assign(removeKeys(req.headers, FORBIDDEN_CLIENT_HEADERS), {});
  request(url,
  {
    headers: headers
  }).on('response', (r) => { console.log("Finished POST (" + r.statusCode + ") " + url)}).pipe(res);
});

app.listen(3000, function () {
  console.log('CORS Running on port 3000!');
});
