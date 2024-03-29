const path = require('path');
const Discord = require('discord.js');
const fs = require('fs');
const Boxes = require('../Systems/Boxes.js');
const Message = require('../Utils/Message.js');
const Command = require('../Construction/Command.js');
const variables = require('../../utilites/variables.js');
const Event = require('../Construction/Event.js');

module.exports = class Util {
  constructor(Main) {
    this.Main = Main;
    this.Message = new Message(this)
    this.Systems = {};
    this.Systems.Boxes = new Boxes(this);
  }
  async reaction(validReactions, message, array = false) {
    let Validated_Reactions = [];
    for (let e of validReactions) {
      if (array === true) {
        Validated_Reactions.push(e.split(':')[0]);
      }
      await message.react(e);
    }
    if (array === true) return Validated_Reactions;
  }
  async Reaction_Collector(Validated_Reactions, message, author, time, max, promise) {
    const filter = (reaction, user) =>
        Validated_Reactions.includes(reaction.emoji.name) && user.id === author.id;
    if (promise)
      return message.awaitReactions(filter, {
        time: time,
        max: max,
        errors: promise,
      });
    return message.createReactionCollector(filter, {
      time: time,
      max: max
    });
  }
  isClass(input) {
    return (
      typeof input === 'function' &&
      typeof input.prototype === 'object' &&
      input.toString().substring(0, 5) === 'class'
    );
  }

  get directory() {
    return `${path.dirname(require.main.filename)}${path.sep}`;
  }

  trimArray(arr, maxLen = 10) {
    let array;
    if (arr.length > maxLen) {
      const len = arr.length - maxLen;
      array = arr.slice(0, maxLen);
      array.push(`${len} more...`);
    }
    return array;
  }

  formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
  }
  formatPerms(perm) {
    return perm
      .toLowerCase()
      .replace(/(^|"|_)(\S)/g, (s) => s.toUpperCase())
      .replace(/_/g, ' ')
      .replace(/Guild/g, 'Server')
      .replace(/Use Vad/g, 'Use Voice Activity');
  }
  removeDuplicates(arr) {
    // eslint-disable-next-line no-undef
    return [...new Set(arr)];
  }

  async loadCommands() {
    fs.readdirSync(`${this.directory}Commands/`).forEach((module) => {
      const commands = fs
        .readdirSync(`${this.directory}Commands/${module}/`)
        .filter((file) => file.endsWith('.js'));
      for (const commandFile of commands) {
        delete require.cache[commandFile];
        const {
          name
        } = path.parse(commandFile);
        const File = require(`${this.directory}Commands/${module}/${commandFile}`);
        if (!this.isClass(File))
          throw new TypeError(`Команда ${name} не экспортирует класс.!`);
        const command = new File(this.Main, name.toLowerCase());
        if (!(command instanceof Command))
          throw new TypeError(`Команда ${name} не принадлежит командам.`);
        command.category === undefined ? (command.category = module) : null;
        this.Main.commands.set(command.name, command);
        if (command.aliases.length) {
          for (const alias of command.aliases) {
            this.Main.aliases.set(alias, command.name);
          }
        }
      }
    });
  }

  abbreviateNumber(number, digits = 2) {
    let expK = Math.floor(Math.log10(Math.abs(number)) / 3);
    let scaled = number / Math.pow(1000, expK);
    if (Math.abs(+scaled.toFixed(digits)) >= 1000) {
      scaled /= 1000;
      expK += 1;
    }
    const SI_SYMBOLS = 'apμm KМBTКQ';
    const BASE0_OFFSET = SI_SYMBOLS.indexOf(' ');
    if (expK + BASE0_OFFSET >= SI_SYMBOLS.length) {
      expK = SI_SYMBOLS.length - 1 - BASE0_OFFSET;
      scaled = number / Math.pow(1000, expK);
    } else if (expK + BASE0_OFFSET < 0) return 0;
    return (
      scaled.toFixed(digits).replace(/(\.|(\..*?))0+$/, '$2') +
      SI_SYMBOLS[expK + BASE0_OFFSET].trim()
    );
  }

  addAchievement(param, number, Data, message) {
    if (param && Data.Achievements.includes(number) === false) {
      Data.Achievements.push(number);
      message.channel.send(new Discord.MessageEmbed()
          .setColor('RANDOM')
          .setTitle('**Поздравим**')
          .setImage(`${message.author.avatarURL({ dynamic: true })}`)
          .addField(
              `**${message.author.tag}**`,
              `**С новым достижением**\n**Значок: **${variables.Achievements[number].emoji}\n**Название: **${variables.Achievements[number].name}\n**Описание: **${variables.Achievements[number].description}`
          ));
    }
  }

  formatDate(date) {
    let data = date
    if (typeof date === 'number') {
      data = new Date(date * 1000);
    } else if (typeof date === 'string') {
      data = new Date(date);
    } else if (Array.isArray(date)) {
      data = new Date(date[2], date[1], date[0]);
    }
    return data.toLocaleString('ru', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    });
  }
  formatArray(array, type = 'conjunction') {
    return new Intl.ListFormat('en-GB', {
      style: 'short',
      type: type
    }).format(array);
  }
  managePerms(message, command) {
    let utils = this
    function permission_check(member) {
      return utils.formatArray((message.channel.permissionsFor(member).missing(command.Permission ? utils.Main.defaultPerms.add(command.Permission) : utils.Main.defaultPerms)).map(utils.formatPerms))
    }
    const user_missing = permission_check(message.member)
    const bot_missing = permission_check(message.guild.me)

    return [bot_missing, user_missing]
  }

  randomize(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  toNum(text) {
    return parseInt(text.replace(/[^\d]/g, ''));
  }

  async loadEvents() {
    const events = fs
      .readdirSync(`${this.directory}Events`)
      .filter((file) => file.endsWith('.js'));
    for (const eventFile of events) {
      delete require.cache[eventFile];
      const {
        name
      } = path.parse(eventFile);
      const File = require(`${this.directory}Events/${eventFile}`);
      if (!this.isClass(File))
        throw new TypeError(`Event ${name} dont export class!`);
      const event = new File(this.Main, name);
      if (!(event instanceof Event))
        throw new TypeError(`Event ${name} not belong event's`);
      this.Main.events.set(event.name, event);
      event.emitter[event.type](name, (...args) => event.run(...args));
    }
  }
};