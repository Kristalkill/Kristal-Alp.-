const Command = require('../../Structures/Command');
module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
		});
	}
	async run(message,language,args) {      
		const player = this.Main.music.players.get(message.guild.id);
        if (!player) return message.reply("Музло закажи сначала,даун как ты родился блять?");
        await this.Main.music.leave(message.guild.id);
        return message.reply("Вот как вы суки,ну я вам бассы врублю,пидарасы новой школы");
    }
}