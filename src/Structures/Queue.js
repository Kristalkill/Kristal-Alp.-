module.exports = class Queue {
    constructor(player,Main){
        this.Main = Main;
        this.player = player;
        this.tracks = [];
        this.loop = "nothing";
        this.current = undefined;
        this.message = undefined;
        this.player.on("end",async (evt) =>{
            if(evt && ["REPLACED"].includes(evt.reason))return;

            if(this.loop === "song") await this.tracks.unshift(this.current.track)
            else if(this.loop === "queue") await this.tracks.push(this.current.track)

            await this.next();

            if(!this.message.guild || !this.message.guild.me.voice.channel) return this.end("?")

            if(this.message.guild.me.voice.channel.members.size === 1)return this.end("emptyVC")

            if(!this.current) return this.end("empty")
            await player.play(this.current.song)
        }).on("start", async() => {
            const {title} = await this.Main.music.decode(this.current.song)
            this.message.channel.send(`Щяс качает ${title}`)
        })
    }

    add(song, id){
        return this.tracks.push({song,id})
    }
    next(){
        return this.current = this.tracks.shift()
    }
    async destroy(){
        return await this.player.manager.leave(this.message.guild.id)
    }
    loop(type){
        if(typeof type !== "string" || !["song","queue"].includes(type.toLowerCase())) return this.loop;

    return this.loop === type.toLowerCase() ? (this.loop = undefined) : (this.loop = type.toLowerCase())
    }
    async end(reason){
        switch(reason){
            case "?":

            case "empty":
                await this.destroy()
                return this.message.channel.send('Очередь пустая')

            case "emptyVC":
                await this.destroy()

                return this.message.channel.send('Канал пустой,я ливаю блять')
                
            default:
                await this.destroy()
        }
    }
    async start(message){
        this.message = message;
        if(!this.current){
        await this.next()
        }
        await this.player.play(this.current.song)
    }
}