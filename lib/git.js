/*global require process module */
const spawn = require('child_process').spawn;

const addListeners = function (git) {
  var data = "";

  const pullData = function (chunk) {
    data += chunk;
  };

  git.on('data', pullData);

  git.stdout.on('data', pullData);

  git.stderr.on('data', pullData);

  git.stdout.on('end', function () {
    process.stdout.write(data);
  });
};

const git = function (args) {
  var git = spawn('git', process.argv.slice(2));
  addListeners(git);
};

module.exports = git;
