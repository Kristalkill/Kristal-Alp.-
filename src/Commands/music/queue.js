const Command = require('../../Structures/Command');
const humanizeDuration = require('humanize-duration')
module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
		});
	}
	async run(message,language,args) {
        let data = ''
        let i = 1
        const tracks = await this.Main.music.players.get(message.guild.id).queue.tracks
        const track  = await this.Main.utils.decode(this.Main.music.players.get(message.guild.id).queue.current.song)
        data += `[${i}] [${track.title}](${track.uri}) - ${humanizeDuration(track.length,{round: true,language: message.guild.settings.Moderation.language})}\n`;
        if(tracks){
        tracks.forEach(async e => {
            const { title, length, uri } = await this.Main.utils.decode(e.song)
            data += `[${i + 1}] [${title}](${uri}\'${title}\') - ${humanizeDuration(length,{round: true,language: message.guild.settings.Moderation.language})}\n`;
        });
        }
        message.channel.send(new Discord.MessageEmbed().setDescription(data))

    }
}