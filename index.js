var pkg      = require('./package.json');
var connect  = require('connect');
var urlp     = require('./lib/urlp');
var pulldown = new (require('pulldown'))();
var supplant = require('./lib/supplant');

var errorStr = function (msg) {
  return '(\'console\' in window) && console.log("pldn.io: ' + msg + '")';
};

connect()
  .use(connect.logger('dev'))
  .use(connect.compress())
  .use(connect.favicon())
  // Parse the URL
  .use(urlp.mw.parse)
  // Set the content type as javascript
  .use(function (req, res, next) {
    res.setHeader("Content-Type", "application/javascript");
    next();
  })
  // Grab the files from pulldown
  .use(function (req, res, next) {
    pulldown.init(req.args, function (err, files) {
      if (err) { return next('Pulldown module failed.'); }
      req.files = files;
      next();
    });
  })
  // Produce the final file
  .use(function (req, res) {
    var results = req.files.map(function (file) {
      return file.contents;
    });
    results.unshift(supplant('/** Served with <3 by pldn.io v{version} **/', pkg));
    res.writeHead(200, 'Awesome', {});
    res.end(results.join('\n'));
  })
  // Error handler
  .use(function (err, req, res, next) {
    console.log('err', err);
    res.end(errorStr(err.message || err));
  })
  .listen(9123, function () {
    console.log('pldn.io @ http://localhost:' + this.address().port);
  });