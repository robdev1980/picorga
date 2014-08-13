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

function copyFileCb(err) {
  if(err) {
    console.log('Error: ', err);
  } else {
    console.log('Success');
  }
}

function makeAbsPath(dir) {
  var ret = dir;

  if (dir.indexOf('/') === 0) {
    ret = process.cwd() + dir;    
  }

  return ret;
}

exports.createDirByFileNamePath = function(fileNamePath, cb) {
  var dir = makeAbsPath(fileNamePath);

  mkdirp(path.dirname(dir), cb);
}

exports.createDir = function(dir, cb) {
  var dir = makeAbsPath(dir);

  mkdirp(dir, cb);
}
