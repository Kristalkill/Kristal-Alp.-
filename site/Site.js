const express = require('express')
const app = express()
module.exports = class Site {
  constructor(Main) {
    this.Main = Main
    app.use('/static', express.static(__dirname + '/public'));
    app.set('view engine', 'ejs');
    app.get('/commands', function(req, res) {
      res.render('commands');
    });
    app.get('/stats', function(req, res) {
      res.render('stats', {
        os: os,
      });
    });
    app.get('/', function(req, res) {
      res.render('index');
    });
    app.get('/api/language', (req, res) => {
      res.send(language);
    });
    app.get('/api/commands', (req, res) => {
      res.send(
        Main.commands.filter((command) => command.category != 'development')
      );
    });
    app.get('/api/guilds', (req, res) => {
      res.send(String(Main.guilds.cache.size));
    });
    app.get('/api/users', (req, res) => {
      res.send(String(Main.users.cache.size));
    });
    app.get('/api/channels', (req, res) => {
      res.send(String(Main.channels.cache.size));
    });
    app.get('/api/emojis', (req, res) => {
      res.send(String(Main.emojis.cache.size));
    });
    app.listen(8080)
  }
};