const Command = require('../../Structures/Command');
module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
		});
	}
	async run(message,language,args) {      
        const player = this.Main.music.players.get(message.guild.id);
        if (!player) return message.reply("ДА МУЗЛО ЗАКАЖИ,ЧМО ЕБАНОЙ,ГАВНО САБАЧОЕ,ПЁС ВОНЮЧИЙ");
        if(player.voiceUpdateState !== message.member.voice.channel.id)return message.reply("Присоеденись к омему голосовому каналу.")

        player.stop()

        return message.channel.send(`Музыка успешно скипнута`)
    }
}