var fs = require('fs');
var Gist = require("gister");
var path = process.env.HOME + "/.gitstats";

// Pull credentials from environment variables
var username = process.env.GITHUB_USER;
var token = process.env.GITHUB_TOKEN;
var gist_id = null;

// Grab config
var config = (function () {
  try {
    fs.statSync(path);
  } catch (err) {
    if (err.code === 'ENOENT') {
      fs.writeFileSync(path, JSON.stringify({ data: [] }), 'utf-8');
    } else {
      throw err;
    }
  }

  return {
    write: function () {
      fs.writeFile(path, JSON.stringify(this.rc), "utf-8", function (err) {
        if (err) throw err;
      });
    },
    rc: JSON.parse(fs.readFileSync(path, 'utf-8'))
  };
}());

// our log var
var log = {};

// If environment vars aren't set, check the config file.
username = username || config.rc.username;
token = token || config.rc.token;
gist_id = gist_id || config.rc.gist_id;

// Create new Gist Object
var gist = new Gist({
  username: username,
  token: token,
  gist_id: gist_id
});

// If there's an error, raise it.
gist.on('err', function (err) {
  throw err;
});

// If gist wasn't found we set the gist_id to null
// and create a new gist instead.
gist.on('error:notfound', function (body, res) {
  gist_id = null;
  gist.create(JSON.stringify([log]), "git-stats");
});

// Throws an error if credentials are missing.
gist.on('error:credentials', function () {
  throw new Error("Credentials are required: GitHub username and token.");
});

// If the gist doesn't exist, create a new one.
gist.on('error:gist_id', function () {
  gist.create(JSON.stringify([log]), "git-stats");
});

// When new gist is created, notify user and
// write the new gist_id to conf file.
gist.on('created', function (_, gist_id) {
  console.log("Posted to GitHub.");
  config.rc.gist_id = gist_id;
  config.write();
});

// If gist was successfully updated, notify.
gist.on('updated', function () {
  console.log("Updated gist.");
});

// when we receive the data, merge and write
gist.on('get', function (res) {
  var o = JSON.parse(res);
  var data = JSON.parse(o.files["git-stats"].content);
  data.push(log);

  gist.edit(JSON.stringify(data), "git-stats");
});


var stats = function (args) {
  // Collect data
  log = {
    date: Date.now(),
    command: args.shift(),
    details: args
  };

  // sync to gist
  gist.get();

  // collect on disk
  config.rc.data.push(log);
  config.write();
};

module.exports = stats;
