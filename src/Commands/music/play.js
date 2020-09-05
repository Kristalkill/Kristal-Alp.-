const Command = require('../../Structures/Command');
module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
		});
	}
	async run(message,language,args) {
        if(!args.length) return message.reply("Дурачок,а название")
        const {tracks} = await this.Main.utils.getSongs(args.join(" ").includes('https') ? encodeURI(args.join(" ")): `ytsearch:${encodeURIComponent(args.join(" "))}`)
        if(!tracks.length)return message.reply('Ничего не нашол по твоему запросу!') 
        const channel = message.member.voice 
        if(!channel.channelID)return message.reply('Я не могу подключится туда')
        const player = await this.Main.music.join({
            guild: message.guild.id,
            channel: channel.channelID,
            node:'1'
        });
        await player.play(tracks[0].track)
        if(player.playing){
        message.channel.send(`Сейчас играет ${tracks[0].info.title}`)
        }
        if(!player.playing && !player.paused) await player.play(tracks[0].track)
        player.on("error", error => console.error(error));
        player.on("end", async data => {
            if(data.reason == "REPLACED") return
            console.log(data)
            if(data.reason == "CLEANUP") await this.Main.music.leave(message.guild.id); 
        });
    }
}