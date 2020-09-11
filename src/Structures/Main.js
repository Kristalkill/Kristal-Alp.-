const Util = require('./Util.js');
const Music = require('./Music.js');
const MongoDB = require('./MongoDB.js');
const {MessageEmbed,Collection,Client} = require('discord.js');
module.exports = class Main extends Client {

	constructor(options = {}) {
		super({
			disableMentions: 'everyone',
			messageCacheMaxSize: 50,
			shardId: process.argv[1],
			shardCount: process.argv[2],
			fetchAllMembers: true
		});
		this.validate(options);

		this.commands = new Collection();

		this.aliases = new Collection();

		this.events = new Collection();

		this.utils = new Util(this);

		this.owners = ["359678229096955904"];

		this.embeds = {};
		this.embeds.ErrEmbed = new MessageEmbed()
		.setTitle('Error')
		.setColor('RED');
		this.embeds.OKEmbed = new MessageEmbed()
		.setTitle('OK')
		.setColor('RANDOM');

		this.db = new MongoDB(this)

		this.music =  new Music(this,[{ id: "1", host: "localhost", port: 3000, password: "enderman"}])
	}

	validate(options) {
		if (typeof options !== 'object') throw new TypeError('Настройки не обьект.');

		if (!options.token) throw new Error('You must pass the token for the Main.');
		this.token = options.token;
	}

	async start(token = this.token) {
		this.utils.loadCommands();
		this.utils.loadEvents();
		this.db.connect()
		await super.login(token)
		}
	}
