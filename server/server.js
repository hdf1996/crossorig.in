var express = require('express');
var request = require('request');
var bodyParser = require('body-parser')
var app = express();

const FORBIDDEN_CLIENT_HEADERS = [ 'host', 'cf-connecting-ip', 'cf-ipcountry', 'cf-ray',
                                   'cf-visitor']

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
  res.header('Server', 'PENZOIL DRINKERS HOGO V1')
  let headers = Object.assign(removeKeys(req.headers, FORBIDDEN_CLIENT_HEADERS), {});
  k = request(url,
  {
    headers: headers
  });
  k.on('response', (r) => {
    r.headers['server'] = 'JAY PENZOIL DRINKERS HOGO V1';
    delete r.headers['set-cookie'];
    delete r.headers['connection'];
    delete r.headers['cf-ray'];
    delete r.headers['cf-visitor'];
    delete r.headers['host'];
    delete r.headers['x-forwarded-for'];
    console.log("Finished GET (" + r.statusCode + ") " + url)
  }).on('error', function(e){ console.log('Ehm... something went wrong');}).pipe(res);
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
  var k = request.post(url,
  {
    json: true,
    body: req.rawBody,
    headers: headers
  });
  k.on('response', (r) => {
    r.headers['server'] = 'JAY PENZOIL DRINKERS HOGO V1';
    delete r.headers['set-cookie'];
    delete r.headers['connection'];
    delete r.headers['cf-ray'];
    delete r.headers['cf-visitor'];
    delete r.headers['host'];
    delete r.headers['x-forwarded-for'];
    console.log("Finished POST (" + r.statusCode + ") " + url)
  }).on('error', function(e){ console.log('Ehm... something went wrong');}).pipe(res);
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
  var k = request.put(url,
  {
    json: true,
    body: req.rawBody,
    headers: headers
  });
  k.on('response', (r) => {
    r.headers['server'] = 'JAY PENZOIL DRINKERS HOGO V1';
    delete r.headers['set-cookie'];
    delete r.headers['connection'];
    delete r.headers['cf-ray'];
    delete r.headers['cf-visitor'];
    delete r.headers['host'];
    delete r.headers['x-forwarded-for'];
    console.log("Finished PUT (" + r.statusCode + ") " + url)
  }).on('error', function(e){ console.log('Ehm... something went wrong');}).pipe(res);
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
  var k = request.delete(url,
  {
    json: true,
    body: req.rawBody,
    headers: headers
  });
  k.on('response', (r) => {
    r.headers['server'] = 'JAY PENZOIL DRINKERS HOGO V1';
    delete r.headers['set-cookie'];
    delete r.headers['connection'];
    delete r.headers['cf-ray'];
    delete r.headers['cf-visitor'];
    delete r.headers['host'];
    delete r.headers['x-forwarded-for'];
    console.log("Finished DELETE (" + r.statusCode + ") " + url)
  }).on('error', function(e){ console.log('Ehm... something went wrong');}).pipe(res);
});

app.set('port', (process.env.PORT || 5000))

app.use(express.static('public'));

app.listen(app.get('port'), function () {
  console.log('CORS Running on port 5000!');
});
