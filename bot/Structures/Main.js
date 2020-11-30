const {
  MessageEmbed,
  Collection,
  Client,
  Permissions,
  Intents
} = require('discord.js');
const Util = require('./Utils/Util.js');
const Site = require('../../site/Site.js');
const Logger = require('./Utils/Logger.js');
const Music = require('./Systems/Music/Music.js');
const MongoDB = require('./Utils/MongoDB.js');
module.exports = class extends Client {
  constructor() {
    super({
      disableMentions: 'everyone',
      messageCacheMaxSize: 200,
      ws: {
        intents: Intents.ALL
      }
    });
    this.defaultPerms = new Permissions(process.env.token).freeze();

    this.commands = new Collection();

    this.aliases = new Collection();

    this.events = new Collection();

    this.utils = new Util(this);

    this.owners = ['359678229096955904'];
    this.embeds = {};
    this.embeds.ErrEmbed = new MessageEmbed().setTitle('Error').setColor('RED');
    this.embeds.OKEmbed = new MessageEmbed().setTitle('OK').setColor('RANDOM');
    this.logger = new Logger(this);
    this.db = new MongoDB(this);
    this.music = new Music(this);
  }
  async start() {
    await this.utils.loadCommands();
    await this.utils.loadEvents();
    await this.db.connect();
    await super.login(process.env.token);
    this.site = new Site(this);
  }
};