var dive = require('dive');
var ExifImage = require('exif').ExifImage;
var utils = require('./utils.js')
var fileOperations = require('./file-operations.js');
var path = require('path');
var orgaDir;
var rmdir = require('rimraf');
var resultSet;

exports.start = function(dir, results) {
  resultSet = results;
  resultSet.filesSuccceeded = 0;
  resultSet.filesFailed = 0;
  console.log("Filesystem based picture organization has been started");
  console.log("Looking for exif compatible files at: ", fileOperations.makeAbsPath(dir));
  orgaDir = fileOperations.makeAbsPath(dir + '/..' + dir + '-organized');
  prepareOrgaDir(orgaDir, function(error) {
    if (error) console.error(error);
    else startDive(dir);
  });
}

function prepareOrgaDir(orgaDir, cb) {
  console.log("Organized data will be found at: ", orgaDir);
  rmdir(orgaDir, function(error) {
    if (error) cb(error);
    else {
      fileOperations.createDir(orgaDir, function(error) {
        if (error) cb(error);
        else {
          console.log("Organization directory ", orgaDir, " has been cleanup or created");
          cb(null);
        }
      });
    }
  });
}

function startDive(dir) {
  console.log("Reading files at: ", fileOperations.makeAbsPath(dir));
  dive(process.cwd() + dir, { recursive:true, directories: false, files:true, all: true }, function(err, file) {
    if (err) throw err;
    handleFile(file);
  }, function() {+
    console.log('File walk completed.');
  });
}

function handleFile(file) {
  var orgaPath,
    newDest;

  console.log("Handling file: ", file);
  try {
    new ExifImage({ image : file }, function (error, exifData) {
      if (error) {
        console.log('Error: '+ error.message);
        resultSet.filesFailed++;
      }
      else {
        orgaPath = orgaDir + utils.makePath(file, exifData.exif.CreateDate);
        fileOperations.createDir(orgaPath, function(error){
          if (error) {
            console.error(error);
            resultSet.filesFailed++;
          }
          else {
            newDest = fileOperations.makeAbsPath(orgaPath) + '/' + path.basename(file);
            fileOperations.copyFile(file, newDest, function(error) {
              if (error) {
                console.error(error);
                resultSet.filesFailed++;
              }
              else {
                console.log(file, " => ", newDest);
                resultSet.filesSuccceeded++;
              }
            });
          }
        });
        
      }
    });
  } catch (error) {
    console.log('Error: ' + error.message);
    resultSet.filesFailed++;
  }
}