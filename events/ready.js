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
        Guild.findOne({guildID: mute.guildID},async(err,Data) => {
        const role = guild.roles.cache.get(Data.Moderation.muterole);
        const user = guild.members.cache.get(mute.id);
        if(!guild.members.cache.get(mute.id) && mute.time !== null && mute.time <= Date.now()) res.deleteOne({guild: mute.guildID,id:mute.id});
        if(!guild.members.cache.get(mute.id))return;
        if(!role) res.deleteOne({guild: mute.guildID,id:mute.id})
        if(mute.time === null){
          if(!guild.members.cache.get(mute.id).roles.cache.has(Data.Moderation.muterole)) guild.memebrs.cache.get(mute.id).roles.add(Data.Moderation.muterole)
        }else if(mute.time !== null){
          if(mute.time >= Date.now()){
          if(!user)return;
          if(!user.roles.cache.has(Data.Moderation.muterole))return user.roles.add(Data.Moderation.muterole);
          }else{
            await Mute.deleteOne({guildID:mute.guildID,id:mute.id,reason:mute.reason,time:mute.time,channel:mute.channel});
            user.roles.remove(Data.Moderation.muterole);
            if(guild.channels.cache.get(mute.channel) && guild.members.cache.get(mute.id) && guild.members.cache.get(mute.id).roles.cache.has(Data.Moderation.muterole))return guild.channels.cache.get(mute.channel).send(OKEmbed.setDescription(`${guild.members.cache.get(mute.id)} успешно розмучен`));
            if(user && user.roles.cache.has(Data.Moderation.muterole))return user.send(OKEmbed.setDescription(`${user} успешно розмучен`));
            }
        }
      })
    })
    }
    )
  },3000)
setInterval(()=>{
    Giveaway.find().exec((err,res)=> {
      res.forEach(async Giveaway => {
        const guild = Main.guilds.cache.get(Giveaway.guildID)
        if(!guild)return;
        if(Giveaway.time >= Date.now()){
          Giveaway.users = await guild.channels.cache.get(Giveaway.channel).messages.fetch(Giveaway.messageID).then((v) => Array.from(v.reactions.cache.get("🎉").users.cache.keys()));
          Giveaway.save();
        }else {
          let random = [];
          if(Giveaway.users.length){
          for(let i = 1; i <= Giveaway.users.length; i++){
          random.push(Giveaway.users[Math.floor(Math.random() * Giveaway.users.length)])
          }
          await Giveaway.deleteOne({guildID:Giveaway.guildID,time:Giveaway.time,prize:Giveaway.prize,winners:Giveaway.winners,messageID:Giveaway.messageID,channel:Giveaway.channel})
          guild.channels.cache.get(Giveaway.channel).send(`Победители ${random}`);
        }
          }}
          )})
  },3000)
}