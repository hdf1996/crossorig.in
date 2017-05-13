var express = require('express');
var request = require('request');
var app = express();

app.get(/(http|https)(:)\/\/(.*)/, function (req, res) {
  var url = req.params[0] + "://" + req.params[2];
  request(url).pipe(res);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});