const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const humanizeDuration = require('humanize-duration');
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['shards'],
			description: 'shards',
			category: 'info'
		});
	}
	async run(message,language) {
        
        let embed = new MessageEmbed().setTitle(`ШАРДЫ`)
	    const uptime = await this.Main.shard.broadcastEval('this.uptime');
        const ping = await this.Main.shard.broadcastEval('Math.round(this.ws.ping)');
        const emojis = await this.Main.shard.fetchClientValues('emojis.cache.size');
        const channels = await this.Main.shard.fetchClientValues('channels.cache.size');
		const ram = await this.Main.shard.broadcastEval(`process.memoryUsage().rss`);
		const guilds = await this.Main.shard.fetchClientValues('guilds.cache.size');
		const users = await this.Main.shard.fetchClientValues('users.cache.size')
        for (let i = 0; i < this.Main.options.shardCount; i++) {
            embed.addField(`** **`,language.shards.param.translate({i:i+1,uptime:humanizeDuration(uptime[i],{ round: true,language: message.guild.settings.Moderation.language}),ping:Math.round(ping[i]),memory:this.Main.utils.formatBytes(ram[i]),guilds:guilds[i],user:users[i],channels:channels[i],emojis:emojis[i]}),true)
        }
        message.channel.send(embed)
    }
}