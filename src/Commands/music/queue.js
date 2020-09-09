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
        this.Main.music.players.get('564403545273663489').queue.tracks.forEach(e => {
            const { title, length, uri } = this.Main.utils.decode(e.song)
            data += `[${i + 1}] [${title}](${uri}) - ${humanizeDuration(length,{round: true,language: message.guild.settings.language})}\n`;
        });
        message.channel.send(data)

    }
}