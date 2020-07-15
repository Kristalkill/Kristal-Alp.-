module.exports = (Main) => {
console.log(`[✅Bot] ${Main.user.tag} Запущен на ${PORT}!`)
let statuses = [`k!help`, `${Main.guilds.cache.size} серверов`, `${Main.users.cache.size} участников`, `Bot by END`];
let acitvestatus = statuses[Math.floor(Math.random() * statuses.length)];
setInterval(function () {
    Main.user.setPresence({ game: { name: acitvestatus, status: 'online', type: "STREAMING", url: "https://www.youtube.com/channel/UC-r7FefpKluK-rlwaWlQFOw" } });
    Main.user.setPresence({ activity: { name: acitvestatus }, status: 'online' });
}, 15 * 1000);
setInterval(()=>{
    Mute.find().exec((err,res)=> {
      res.forEach(async mute => {
        const guild = Main.guilds.cache.get(mute.guildID)
        if(!guild)return;
        const role = guild.roles.cache.get(mute.role);
        const user = guild.members.cache.get(mute.id);
        if(!guild.members.cache.get(mute.id) && mute.time !== null && mute.time <= Date.now()) res.deleteOne({guild: mute.guildID,id:mute.id});
        if(!guild.members.cache.get(mute.id))return;
        if(!role) res.deleteOne({guild: mute.guildID,id:mute.id})
        if(mute.time === null){
          if(!guild.members.cache.get(mute.id).roles.cache.has(mute.role)) guild.memebrs.cache.get(mute.id).roles.add(mute.role)
        }else if(mute.time !== null){
          if(mute.time >= Date.now()){
          if(!user)return;
          if(!user.roles.cache.has(mute.role))return user.roles.add(mute.role);
          }else{
            Mute.deleteOne({guildID:mute.guildID,id:mute.id});
            user.roles.remove(mute.role);
            if(guild.channels.cache.get(mute.channel) && guild.members.cache.get(mute.id) && guild.members.cache.get(mute.id).roles.cache.has(mute.role))return message.channel.send(OKEmbed.setDescription(`${guild.members.cache.get(mute.id)} успешно розмучен`));
            if(user && user.roles.cache.has(mute.role))return user.send(OKEmbed.setDescription(`${user} успешно розмучен`));
            }
        }
       
    })
    }
    )},3000)
}