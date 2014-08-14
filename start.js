var engine = require('./engine.js');
var dir = process.argv[2];

if (!dir) {
  dir = '/data';
} else {
  if (dir.indexOf('/') !== 0) {
    dir = '/' + dir;
  }
}

engine.start(dir);