const Command = require('../../Structures/Command');
const Queue = require('../../Structures/Queue');
module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
		});
	}
	async run(message,language,args) {
        if(!args.length) return message.reply("Дурачок,а название")

        const {channel} = message.member.voice 
        if(!channel.id || channel.joinable === false)return message.reply('Я не могу подключится туда')

        const player = this.Main.music.players.get(message.guild.id)|| (await this.Main.music.join(
            {
            guild: message.guild.id,
            channel: channel.id,
            node:'1'
            },
            {selfdeaf: true }
            ))

        const {tracks , loadType, playlistInfo} = await this.Main.music.search(args.join(" ").includes('https') 
        ? encodeURI(args.join(" "))
        : `ytsearch:${encodeURIComponent(args.join(" "))}`)
        
        if(!tracks.length)return message.reply('Ничего не нашол по твоему запросу!')

        if(!player.queue) player.queue = new Queue(player,this.Main)

        switch(loadType){
            case "TRACK_LOADED":
            case "SEARCH_RESULT":

                await player.queue.add(tracks[0].track, message.author.id)
    
                if(!player.connected) await player.connect(channel.id)
                if(!player.playing && !player.paused) await player.queue.start(message);
                return message.channel.send(`В очередь добавлено **${tracks[0].info.title}**`);
            case "PLAYLIST_LOAD":
                tracks.map(async c => await player.queue.add(c.track))
                if(!player.connected) await player.connect(channel.id)
                if(!player.playing && !player.paused) await player.queue.start(message);
                return message.channel.send(`Загружен плейлист **${playlistInfo.name}** | [Плейлист - \`${tracks.length}\`]`);
        }  
}
}