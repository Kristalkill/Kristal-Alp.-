const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const humanizeDuration = require('humanize-Duration')
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
		const ram = await this.Main.shard.broadcastEval(`process.memoryUsage().rss`);
		const guilds = await this.Main.shard.fetchClientValues('guilds.cache.size');
		const users = await this.Main.shard.fetchClientValues('users.cache.size')
        for (let i = 0; i < this.Main.options.shardCount; i++) {
            embed.addField(`${i}:${humanizeDuration(uptime[i])}~${Math.round(ping[i])}ms,${this.Main.utils.formatBytes(ram[i])} ${guilds[i]}, ${users[i]}`)
        }
        message.channel.send(embed)
    }
}