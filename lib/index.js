var config = require('../config.json');

var xhr = require('xhr').load(config.host, config.port);

var stats = function (args) {
  var data = {
    date: Date.now(),
    command: args.shift(),
    details: args
  };

  xhr(config.path).post(data);
};

module.exports = stats;
