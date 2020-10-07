const Embed = require('./Embed')
const fetch = require('node-fetch')
module.exports = class Command {
  constructor(Main, name, options = {}) {
    this.Main = Main;
    this.name = options.name || name;
    this.aliases = options.aliases || [];
    this.category = options.category;
    this.nsfw = options.nsfw || false;
    this.public = options.public;
    this.Permission = options.Permission;
    this.PermissionBOT = options.PermissionBOT;
    this.Embed = new Embed(Main)
  }

  async run( /* message, ...args */ ) {
    throw new Error(`Команда ${this.name} не содержин метод запуска!`);
  }
  static async getUser(args, message) {
    return message.guild.member(
      message.mentions.users
      .filter((u) => u.id != message.guild.me.id)
      .first() || message.guild.members.cache.get(args)
    );
  }
  static async getChannel(args, message) {
    message.guild.channels.cache.get((message.mentions.channels.first() || message.guild.channels.cache.find(r => r.name === args.join(' '))).id || message.guild.channels.cache.get(args.join(' ')));
  }
  static async getRole(args, message) {
    return message.guild.roles.cache.get(message.mentions.roles.first() ||
      message.guild.roles.cache.find(r => r.name === args.join(' ')).id ||
      message.guild.roles.cache.get(args.join(' ')));
  }
  static async getGuild(id) {
    return this.Main.guilds.cache.get(id)
  }
  static async language(language) {
    return language || 'en'
  }
  static async fetch(args) {
    return fetch(args)
  }

};