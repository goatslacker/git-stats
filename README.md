# git-stats

Personal git statistics for fun

It's like scrobbling, but for git.

Somewhat inspired by [git-achievements](https://github.com/icefox/git-achievements) and [this blog](http://stravid.com/articles/personal-git-commit-statistics/)

`git-stats` is written in JavaScript, uses node.js, and synchronizes to gist.github.com where it keeps track of all your data. Your data is also kept locally on your filesystem in `~/.gitstats`. The goal of the project was, besides tracking data about myself, to keep it simple.

# Install

via npm

    sudo npm install git-stats -g

and then you'll want to setup `git` as an alias to `git-stats`. All your commands are forwarded to git and then tracked. You can set up the alias by putting this in your `.bashrc` or `.bash_profile`

    alias git="git-stats"

after that, just use `git` like you normally would. Stats will be collected in the background and posted to gist.github.com

# LICENSE

http://josh.mit-license.org
