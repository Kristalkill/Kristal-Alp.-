const Command = require('../../Structures/Command');
module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
		});
	}
	async run(message,language,args) {      
        await this.Main.music.leave(message.guild.id);
        return message.reply("Вот как вы скуи,ну я вам бассы врублю,пидарасы новой школы");
    }
}