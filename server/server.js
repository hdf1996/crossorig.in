var express = require('express');
var request = require('request');
var app = express();

app.get(/(http|https)(:)\/\/(.*)/, function (req, res) {
  var url = req.url.substr(1);
  console.log("Request url GET: " + url)
  console.log(req.url)
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Request-Method', 'GET, PATCH, PUT, POST, OPTIONS, DELETE');
  res.header('Doge', 'SUCH CORS');
  request(url, () => { console.log("Finished GET " + url) }).pipe(res);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});