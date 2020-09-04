const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
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
	    const uptime = await client.shard.broadcastEval('this.uptime');
		const ping = await client.shard.broadcastEval('Math.round(this.ws.ping)');
		const ram = await client.shard.broadcastEval(`process.memoryUsage().rss`);
		const guilds = await client.shard.fetchClientValues('guilds.cache.size');
		const users = await client.shard.fetchClientValues('users.cache.size')
        for (let i = 0; i < client.options.shardCount; i++) {
            embed.addField(`${i}:${client.util.parseDur(uptime[i])}~${Math.round(ping[i])}ms,${this.Main.utils.formatBytes(ram[i])} ${guilds[i]}, ${users[i]}`)
        }
        message.channel.send(embed)
    }
}