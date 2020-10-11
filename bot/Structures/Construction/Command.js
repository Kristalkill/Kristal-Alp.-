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
  async similar(arr, str) {
    let a = await arr.sort((a, b) => levenshtein.get(str, a) - levenshtein.get(str, b)).values().next().value
    console.log(a)
    return a
  }
  async get(args, message, type) {
    const cache = message.guild[type].cache
    return await cache.get(message.guild[type].cache.get(args) || (type == 'members' ? message.mentions.users.filter((u) => u.id != message.guild.me.id) : message.mentions[type].first() || await this.similar(cache, args)).id)
  }
  async Guild(id) {
    return this.Main.guilds.cache.get(id)
  }
  async language(language) {
    return language || 'en'
  }
  async fetch(args) {
    return fetch(args)
  }

};