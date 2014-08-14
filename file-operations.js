var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');

exports.copyFile = function(source, target, cb) {
  var rd = fs.createReadStream(source);

  rd.on('error', function(err) {
    cb(err);
  });
  var wr = fs.createWriteStream(target);
  wr.on('error', function(err) {
    cb(err);
  });
  wr.on('close', function(ex) {
    cb();
  });
  rd.pipe(wr);
}

exports.makeAbsPath = function(dir) {
  var ret = dir;

  if (dir.indexOf('/') === 0) {
    ret = process.cwd() + dir;    
  }
  ret = path.normalize(ret);

  return ret;
}

exports.createDir = function(dir, cb) {
  var dir = exports.makeAbsPath(dir);

  mkdirp(dir, cb);
}
