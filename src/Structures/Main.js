const Util = require('./Util.js');
const Discord = require('discord.js');
const { Manager } = require("@lavacord/discord.js");
module.exports = class Main extends Discord.Client {

	constructor(options = {}) {
		super({
			disableMentions: 'everyone',
			messageCacheMaxSize: 50,
			shardId: process.argv[1],
			shardCount: process.argv[2],
			fetchAllMembers: true
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

		this.nodes = [
			{ id: "1", host: "localhost", port: 3000, password: "enderman" }
		  ];
		this.music =  new Manager(this,this.nodes)
	}

	validate(options) {
		if (typeof options !== 'object') throw new TypeError('Options should be a type of Object.');

		if (!options.token) throw new Error('You must pass the token for the Main.');
		this.token = options.token;
	}

	async start(token = this.token) {
		this.utils.loadCommands();
		this.utils.loadEvents();
		await super.login(token)
		}
	}
