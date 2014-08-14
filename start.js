var engine = require('./engine.js'),
 dir = process.argv[2],
 start = new Date(),
 end,
 results = {};

if (!dir) {
  dir = '/data';
} else {
  if (dir.indexOf('/') !== 0) {
    dir = '/' + dir;
  }
}
process.on('exit', function() {
  end = new Date();
  console.log('Done');
  console.log('' + results.filesSuccceeded, '/', '' + (results.filesSuccceeded + results.filesFailed), ' files successfully processed');
  console.log('Time: ', (end.getTime() - start.getTime()) / 1000, " seconds")
});
engine.start(dir, results);