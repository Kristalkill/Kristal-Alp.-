const Util = require('./Util.js');
const { Manager } = require("@lavacord/discord.js");
const Discord = require('discord.js');
module.exports = class Main extends Discord.Client {

	constructor(options = {}) {
		super({
			disableMentions: 'everyone',
			messageCacheMaxSize: 100,
			messageCacheLifetime: 600,
			messageSweepInterval: 600
		});
		this.validate(options);

		this.commands = new Discord.Collection();

		this.aliases = new Discord.Collection();

		this.events = new Discord.Collection();

		this.utils = new Util(this);

		this.owners = options.owners;

		this.embeds = {};
		this.embeds.ErrEmbed = new Discord.MessageEmbed()
		.setTitle('Error')
		.setColor('RED');
		this.embeds.OKEmbed = new Discord.MessageEmbed()
		.setTitle('OK')
		.setColor('RANDOM');

		this.db = {};
		this.db.cooldowns = new Map(); 
		this.db.Block = require('../models/block');
		this.db.Giveaway = require('../models/giveaway');
		this.db.Guild = require('../models/guild');
		this.db.Mute = require('../models/mute');
		this.db.User = require('../models/user');
	}

	validate(options) {
		if (typeof options !== 'object') throw new TypeError('Options should be a type of Object.');

		if (!options.token) throw new Error('You must pass the token for the Main.');
		this.token = options.token;
	}

	async start(token = this.token) {
		this.utils.loadCommands();
		this.utils.loadEvents();
		super.login(token);
		this.music = new Manager(this,[{ "host": "localhost", "port": 2333, "password": "youshallnotpass" }]);
	}

};
