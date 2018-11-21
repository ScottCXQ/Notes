/**
 * 找出一个目录中最大的文件
 */
const fs=require('fs');
const path=require('path');

/*
function findLargest(dir, cb) {
  // 读取目录下所有的文件
  fs.readdir(dir, function(err, files) {
    if (err) return cb(err);

    let counter=files.length;
    let errored=false;
    let stats=[];

    files.forEach(function(file, index) {
      // 读取文件信息
      fs.stat(path.join(dir, file), function(err, stat) {
        if (errored) return;

        if (err) {
          errored=true;
          return cb(err);
        }

        stats[index]=stat;

        if (--counter==0) {
          let largest=stats.filter(function(stat) { return stat.isFile() }).reduce(function(prev, next) {
            if (prev.size > next.size) return prev;
            return next;
          });

          cb(null, files[stats.indexOf(largest)]);
        }
      });
    });
  });
}
*/

let readDir=function(dir) {
  return new Promise(function(resolve, reject) {
    fs.readdir(dir, function(err, files) {
      if (err) reject(err);
      resolve(files);
    });
  });
};

let stat=function(path) {
  return new Promise(function(resolve, reject) {
    fs.stat(path, function(err, stat) {
      if (err) reject(err);
      resolve(stat);
    });
  });
};

function findLargest(dir) {
  return readDir(dir)
    .then(function(files) {
      let promises=files.map(file => stat(path.join(dir, file)));
      return Promise.all(promises).then(function(stats) {
        return { stats, files };
      })
    })
    .then(data => {
      let largest=data.stats.filter(function(stat) { return stat.isFile() }).reduce((prev, next) => {
        if (prev.size > next.size) return prev;
        return next;
      });

      return data.files[data.stats.indexOf(largest)];
    });
}

findLargest('./', function(err, filename) {
  if (err) return console.error(err);
  console.log('largest file is: ', filename);
});
