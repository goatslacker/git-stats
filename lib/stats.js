const fs = require('fs');
const path = require('path');

const Data = function () {
  this.filename = path.join(__dirname, "..", ".data.json");
  this.stats = JSON.parse(fs.readFileSync(this.filename, 'utf8'));
};

Data.prototype.write = function () {
  fs.writeFile(this.filename, JSON.stringify(this.stats), function (err, stdout, stderr) {
    if (err) {
      throw err;
    }

    stdout && process.stdout.write(stdout);
    stderr && process.stdout.write(stderr);
  });
};

const stats = function (args) {
  var data = new Data();

  var command = args.shift();

  if (!data.stats.hasOwnProperty(command)) {
    data.stats[command] = [];
  }

  data.stats[command].push({
    date: Date.now(),
    details: args
  });

  data.write();
};

module.exports = stats;
