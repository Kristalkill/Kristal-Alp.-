const path = require('path');
const Command = require('./Command.js');
const variables = require('../utilites/variables.js');
const Discord = require('discord.js');
const Event = require('./Event.js');
const fs = require('fs')
module.exports = class Util {

	constructor(Main) {
		this.Main = Main;
	}
	async promptMessage (message, author, time, validReactions,max = 10000,promise = false) {
		validReactions.forEach(e => {message.react(e)});;
		const filter = (reaction, user) => validReactions.includes(reaction.emoji.name) && user.id === author.id;
		if(promise) return message.awaitReactions(filter, { max: max , time: time})
		else return  message.createReactionCollector(filter,{timer: time})
	}
	isClass(input) {
		return typeof input === 'function' &&
        typeof input.prototype === 'object' &&
        input.toString().substring(0, 5) === 'class';
	}

	get directory() {
		return `${path.dirname(require.main.filename)}${path.sep}`;
	}

	trimArray(arr, maxLen = 10) {
		if (arr.length > maxLen) {
			const len = arr.length - maxLen;
			arr = arr.slice(0, maxLen);
			arr.push(`${len} more...`);
		}
		return arr;
	}

	formatBytes(bytes) {
		if (bytes === 0) return '0 Bytes';
		const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
		const i = Math.floor(Math.log(bytes) / Math.log(1024));
		return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
	}

	removeDuplicates(arr) {
		return [...new Set(arr)];
	}

	async loadCommands() {
		  fs.readdirSync(`${this.directory}Commands/`).forEach(module => {
			  const commands = fs.readdirSync(`${this.directory}Commands/${module}/`).filter(file => file.endsWith('.js'));
			  for (const commandFile of commands) {
				delete require.cache[commandFile];
				  const { name } = path.parse(commandFile);
				  const File = require(`${this.directory}Commands/${module}/${commandFile}`);
				  if (!this.isClass(File)) throw new TypeError(`Ивент ${name} не экспортирует класс.!`);
				  const command = new File(this.Main, name.toLowerCase());
				  if (!(command instanceof Command)) throw new TypeError(`Команда ${name} не принадлежит командам.`);
				  command.category == undefined ? command.category = module : null;
				  this.Main.commands.set(command.name, command);
				  if (command.aliases.length) {
					for (const alias of command.aliases) {
						this.Main.aliases.set(alias, command.name);
					}
				}
			  }
		  })
	}
    abbreviateNumber(number,digits=2){
		var expK = Math.floor(Math.log10(Math.abs(number)) / 3);
		var scaled = number / Math.pow(1000, expK);
		if(Math.abs(scaled.toFixed(digits))>=1000) {
		  scaled /= 1000;
		  expK += 1;
		}
		var SI_SYMBOLS = "apμm KМBTКQ";
		var BASE0_OFFSET = SI_SYMBOLS.indexOf(' ');
		if (expK + BASE0_OFFSET>=SI_SYMBOLS.length) {
		  expK = SI_SYMBOLS.length-1 - BASE0_OFFSET;
		  scaled = number / Math.pow(1000, expK);
		}
		else if (expK + BASE0_OFFSET < 0) return 0;
		return scaled.toFixed(digits).replace(/(\.|(\..*?))0+$/,'$2') + SI_SYMBOLS[expK+BASE0_OFFSET].trim();
	  };
	  addAchievement(param,number,Data,message){
		if(param && Data.Achievements.includes(number) == false ){
		  Data.Achievements.push(number)
		  let AchievementEmed = new Discord.MessageEmbed()
		  .setColor('RANDOM')
		  .setTitle(`**Поздравим**`)
		  .setImage(`${message.author.avatarURL({dynamic: true})}`)
		  .addField(`**${message.author.tag}**`,`**С новым дистижением**\n**Значок: **${variables.Achievements[number].emoji}\n**Название: **${variables.Achievements[number].name}\n**Описание: **${variables.Achievements[number].description}`)
		   message.channel.send(AchievementEmed)
	  }
	  };
	  formatDate(date) {
		if (typeof date == 'number') {
		  date = new Date(date * 1000);
		} else if (typeof date == 'string') {
		  date = new Date(date);
		} else if (Array.isArray(date)) {
		  date = new Date(date[2], date[1], date[0]);
		}
		return date.toLocaleString("ru", {day: '2-digit', month: '2-digit', year: '2-digit'});
	  };
	  managePerms(message, needPerms, addMore = false) {
		  if(Array.isArray(needPerms)){
		  let need = [];
		  if (addMore) {
			needPerms.push("EMBED_LINKS");
			needPerms.push("ADD_REACTIONS");
			needPerms.push("USE_EXTERNAL_EMOJIS");
		  }
		  needPerms.map((p) => !message.channel.permissionsFor(addMore ? message.guild.me : message.member).has(p) ? need.push(p) : null);
		  if (need.length) return need;
		  else return false;
	  }else return false;
	}
	  randomize(min, max) {
		  return Math.floor(Math.random() * (max-min) + min)
	  };
	  toNum(text) {
		return parseInt(text.replace(/[^\d]/g, ""));
	  };
	async loadEvents() {
		const events = fs.readdirSync(`${this.directory}Events`).filter(file => file.endsWith('.js'));
		for (const eventFile of events) {
			delete require.cache[eventFile];
			const { name } = path.parse(eventFile);
			const File = require(`${this.directory}Events/${eventFile}`);
			if (!this.isClass(File)) throw new TypeError(`Ивент ${name} не экспортирует класс.!`);
			const event = new File(this.Main, name);
			if (!(event instanceof Event)) throw new TypeError(`Ивент ${name} не принадлежит Ивентам`);
			this.Main.events.set(event.name, event);
			event.emitter[event.type](name, (...args) => event.run(...args));

		}
}

};
