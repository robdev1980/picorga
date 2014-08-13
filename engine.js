var dive = require('dive');
var ExifImage = require('exif').ExifImage;
var utils = require('./utils.js')
var fileOperations = require('./file-operations.js');

exports.start = function(dir) {
  createOrgaDir(dir, function(err) {
    if (err) console.err(err);
    else startDive(dir);
  });
}

function startDive(dir) {
  dive(process.cwd() + dir, { recursive:true, directories: false, files:true, all: true }, function(err, file) {
    if (err) throw err;
    handleFile(file);
  }, function() {+
    console.log('File walk completed.');
  });
}

function createOrgaDir(dir, cb) {
  fileOperations.createDir(dir + '/organized', cb);
}

function handleFile(file) {
  try {
    new ExifImage({ image : file }, function (error, exifData) {
      if (error) console.log('Error: '+ error.message);
      else {
        logFile(file, exifData.exif);
        console.log(utils.makePath(file, exifData.exif.CreateDate)); 
        console.log('----------------------------');
      }
    });
  } catch (error) {
    console.log('Error: ' + error.message);
  }
}

function logFile(file, exif) {
  console.log('----------------------------');
  console.log(file);
  console.log(exif.CreateDate);
}