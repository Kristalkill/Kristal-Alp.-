const Command = require('../../Structures/Command');
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['shards'],
			description: 'shards',
			category: 'info'
		});
	}
	async run(message,language) {
const values = await this.Main.shard.broadcastEval(`
 [
 this.shard.id,
 this.guilds.size
 ]
`);
let finalString = "**Статус шарда**\n\n"
values.forEach((value) => {
 finalString += `• ШАРД#${value[0]}|Сервера: ${value[1]}\n`;
});
message.channel.send(finalString);
    }
}