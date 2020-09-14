const { MessageEmbed, Collection, Client } = require('discord.js');
const Util = require('./Util.js');
const Music = require('./Music.js');
const MongoDB = require('./MongoDB.js');

module.exports = class Main extends Client {
  constructor(options = {}) {
    super({
      disableMentions: 'everyone',
      messageCacheMaxSize: 200,
      fetchAllMembers: true,
    });
    this.validate(options);

    this.commands = new Collection();

    this.aliases = new Collection();

    this.events = new Collection();

    this.utils = new Util(this);

    this.owners = ['359678229096955904'];

    this.embeds = {};
    this.embeds.ErrEmbed = new MessageEmbed().setTitle('Error').setColor('RED');
    this.embeds.OKEmbed = new MessageEmbed().setTitle('OK').setColor('RANDOM');

    this.db = new MongoDB(this);

    this.music = new Music(this, [
      {
        id: '1',
        host: 'localhost',
        port: 3000,
        password: 'enderman',
      },
    ]);
  }

  validate(options) {
    if (typeof options !== 'object')
      throw new TypeError('Настройки не обьект.');
  }

  async start() {
    this.utils.loadCommands();
    this.utils.loadEvents();
    this.db.connect();
    await super.login(process.env.token);
  }
};
