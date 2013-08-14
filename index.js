var http = require('http'),
    urlp = require('./urlp');

http.createServer(function (req, res) {
  var args = urlp.parse(req.url);
  console.log(args);
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(JSON.stringify(args));
}).listen(0, function () {
  console.log('pldn.io @ http://localhost:' + this.address().port);
});