var config;
var fs = require('fs');
var path = process.env.HOME + "/.gitstats";

// check for/add config file
(function () {
  var url = require('url');
  var argv = process.argv.slice(2);
  var uri;
  if (argv[0] === "--conf") {
    config = url.parse(argv[1]);
    fs.writeFileSync("./config.json", JSON.stringify(config), "utf8");
    process.exit();
  }
}());

try {
  config = require('../config.json');
} catch (e) {
  process.stdout.write("Run git --conf <url>\n");
  process.stdout.write("You must first create a config.json\n");
  process.exit();
}

var xhr = require('./xhr').load(config.hostname, config.port);

var stats = function (args) {
  var data = {
    date: Date.now(),
    command: args.shift(),
    details: args
  };

  // collect on disk
  var all = [];
  try {
    all = require(path);
  } catch (e) {
    all = [];
  }
  all.push(data);

  // post to cloud
  xhr(config.path).post(data);

  // write to disk
  fs.writeFileSync(path, JSON.stringify(all), "utf8");
};

module.exports = stats;
