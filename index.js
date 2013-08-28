var pkg      = require('./package.json');
var connect  = require('connect');
var urlp     = require('./lib/urlp');
var pulldown = new (require('pulldown'))();

String.supplant = function (str, o) {
  return str.replace(/{([^{}]*)}/g,
    function (a, b) {
      var r = o[b];
      return typeof r === 'string' || typeof r === 'number' ? r : a;
    }
  );
};

var error = function (msg) {
  return 'console.log("pldn.io: ' + msg + '")';
};

connect()
  .use(urlp.mw.parse)
  .use(function (req, res, next) {
    pulldown.init(req.args, function (err, files) {
      if (err) { return res.send(500, error('Pulldown module failed.')); }
      req.files = files;
      next();
    });
  })
  .use(function (req, res) {
    var results = req.files.map(function (file) {
      return file.contents;
    });
    results.unshift(String.supplant('/* Served by pldn.io v{version} */', pkg));
    res.end(results.join('\n'));
  })
  .listen(9123, function () {
    console.log('pldn.io @ http://localhost:' + this.address().port);
  });