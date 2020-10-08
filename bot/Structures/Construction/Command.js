const Embed = require('./Embed')
const fetch = require('node-fetch')
const levenshtein = require('fast-levenshtein');
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
  async compare(str, arr) {
    return await arr.sort((a, b) => levenshtein.get(str, a) - levenshtein.get(str, b)).values().next().value
  }
  async getUser(args, message) {
    return message.guild.member(
      message.mentions.users
      .filter((u) => u.id != message.guild.me.id)
      .first() || message.guild.members.cache.get(args)
    );
  }
  async getChannel(args, message) {
    message.guild.channels.cache.get((message.mentions.channels.first() || compare(args.join(' '), message.guild.channels.cache)).id || message.guild.channels.cache.get(args.join(' ')));
  }
  async getRole(args, message) {
    return message.guild.roles.cache.get(message.mentions.roles.first() ||
      message.guild.roles.cache.find(r => r.name === args.join(' ')).id ||
      message.guild.roles.cache.get(args.join(' ')));
  }
  async getGuild(id) {
    return this.Main.guilds.cache.get(id)
  }
  async language(language) {
    return language || 'en'
  }
  async fetch(args) {
    return fetch(args)
  }

};