var fs = require('fs');
var Gist = require("gister");
var path = process.env.HOME + "/.gitstats";

// Pull credentials from environment variables
var username = process.env.GITHUB_USER;
var token = process.env.GITHUB_TOKEN;

// TODO need to pull config from another place

var gist = new Gist({
  username: username,
  token: token,
  gist_id: gist_id
});

gist.on('created', function (_, gist_id) {
  console.log("Posted to GitHub.");
  // TODO need to save gist_id somewhere
});

gist.on('updated', function () {
  console.log("Updated gist.");
});

// If the gist doesn't exist, create a new one.
gist.on('error:gist_id', function () {
  gist.post(JSON.stringify([log]));
});

// Throws an error if credentials are missing.
gist.on('error:credentials', function () {
  throw new Error("Credentials are required: GitHub username and token.");
});

gist.on('get', function (data) {
  data = JSON.parse(data);
  data.push(log);

  gist.edit(data);
});

var stats = function (args) {
  var log = {
    date: Date.now(),
    command: args.shift(),
    details: args
  };

  // sync to gist
  gist.get();

  // collect on disk
  fs.readFile(path, "utf-8", function (err, data) {
    if (err) throw err;

    data = JSON.parse(data);
    data.push(log);

    fs.writeFile(path, JSON.stringify(data), "utf-8", function (err) {
      if (err) throw err;
    });
  });
};

module.exports = stats;
