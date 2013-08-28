var connect = require('connect');
var urlp = require('./lib/urlp');

connect()
  .use(urlp.mw.parse)
  .use(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(JSON.stringify(req.args));
  })
  .listen(9123, function () {
    console.log('pldn.io @ http://localhost:' + this.address().port);
  });