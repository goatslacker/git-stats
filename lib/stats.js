const xhr = require('xhr').load('gitstats.nodester.com'); // TODO ask server on first start-up...

const stats = function (args) {
  var data = {
    date: Date.now(),
    command: args.shift(),
    details: args
  };

  xhr('/f').post(data);
};

module.exports = stats;
