const Command = require('../../Structures/Command');
const humanizeDuration = require('humanize-duration')
module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
		});
	}
	async run(message,language,args) {
        let data = ''
        let i = 0
        const {tracks} = this.Main.music.players.get(message.guild.id).queue
        let {title, length, uri} = this.Main.utils.decode(this.Main.music.players.get(message.guild.id.track))
        data += `[${i + 1}] [${title}](${uri}) - ${humanizeDuration(length,{round: true,language: message.guild.settings.Moderation.language})}\n`;
        if(tracks){
        tracks.forEach(e => {
            const { title, length, uri } = this.Main.utils.decode(e.song)
            data += `[${i + 1}] [${title}](${uri}) - ${humanizeDuration(length,{round: true,language: message.guild.settings.Moderation.language})}\n`;
        });
        }
        message.channel.send(data)

    }
}