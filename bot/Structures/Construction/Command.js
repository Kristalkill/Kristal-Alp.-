const Embed = require('./Embed')
const fetch = require('node-fetch');
const {
  Permissions
} = require('discord.js');
const {
  JaroWinklerDistance
} = require('natural');
module.exports = class Command {
  constructor(Main, name, options = {}) {
    this.Main = Main;
    this.name = options.name || name;
    this.aliases = options.aliases || [];
    this.category = options.category;
    this.nsfw = options.nsfw || false;
    this.public = options.public;
    this.Permission = new Permissions(options.Permission).freeze();
    this.PermissionBOT = new Permissions(options.PermissionBOT).freeze();
    this.Embed = new Embed(Main)
  }

  async run( /* message, ...args */ ) {
    throw new Error(`Command ${this.name} doesn't exist start method!`);
  }
  get(args, message, type, author = true) {
    message.guild[type].fetch()
    let cache = message.guild[type].cache
    let arr = type === 'members' ? cache.map(x => (x.nickname || x.user.username)) : cache.map(x => x.name)
    let value = args || ''
    let fined  = arr.sort((a, b) => JaroWinklerDistance(value, b) - JaroWinklerDistance(value, a))[0];
    if (JaroWinklerDistance(value, fined) < 0.7) fined = undefined
    return (
      cache.get(value) ||
      (type === 'members' ? message.mentions[type].filter(m => m.id !== message.guild.me.id) : message.mentions[type].first()) ||
      cache.find(element =>
        (type === 'members' ? (element.nickname || element.user.username) : element.name) === fined
      ) ||
      author ? message.guild.member(message.author) : undefined
    )
  }
  async Guild(id) {
    return this.Main.guilds.cache.get(id)
  }
  language(language) {
    return require(`../../languages/${language || 'en'}.json`);
  }
  async fetch(args) {
    return await fetch(args).then((r) => r.json()).then((r) => r.image || r.url)
  }

};