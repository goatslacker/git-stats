const git = require('./git');
const stats = require('./stats');

const git_stats = function (args) {
  // process stats
  stats(args.slice(0));

  // call git
  git(args.slice(0));
};

module.exports = git_stats;
