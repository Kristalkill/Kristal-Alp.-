const Command = require('../../Structures/Command');
const humanizeDuration = require('humanize-duration')
const {MessageEmbed} = require('discord.js')
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
        if(tracks.length > 0){
            for(e of tracks){
                const { title, length, uri } = await this.Main.utils.decode(e.song)
                data += `[${i + 1}] [${title}](${uri}\'${title}\') - ${humanizeDuration(length,{round: true,language: message.guild.settings.Moderation.language})}\n`;
            }
        }
        return message.channel.send(new MessageEmbed().setDescription(data))

    }
}