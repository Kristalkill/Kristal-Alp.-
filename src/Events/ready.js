const Event = require('../Structures/Event');
const Discord = require('discord.js');
module.exports = class extends Event {
  constructor(...args) {
		super(...args, {
			once: true
		});
	}
	async run() {
	console.log(`[✅Bot] ${this.Main.user.tag} Запущен!`)
	const GiveAway  = new Discord.MessageEmbed()
.setTitle("🎉**Giveaway** 🎉")
setInterval(()=>{
  try {
    this.Main.user.setPresence({ game: { name: `k!help`, status: 'online', type: "STREAMING", url: "https://www.youtube.com/channel/UC-r7FefpKluK-rlwaWlQFOw" } });
    this.Main.user.setPresence({ activity: { name: `k!help` }, status: 'online' });
  } catch (error) {
    console.log(error)
  }}, 15 * 1000); 
setInterval(()=>{
  try {
    this.Main.db.Mute.find().exec((err,res)=> {
      if(err) return console.log(err);
      if(res){
      res.forEach(async mute => {
        if(mute.time == false)return;
        const guild = this.Main.guilds.cache.get(mute.guildID)
        if(!guild)return;
        Main.db.Guild.findOne({guildID: mute.guildID},async(err,Data) => {
          if(err) return console.log(err);
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
            if(guild.channels.cache.get(mute.channel) && guild.members.cache.get(mute.id) && guild.members.cache.get(mute.id).roles.cache.has(Data.Moderation.muterole))return guild.channels.cache.get(mute.channel).send(this.Main.embeds.OKEmbed.setDescription(`${guild.members.cache.get(mute.id)} успешно розмучен`));
            if(user && user.roles.cache.has(Data.Moderation.muterole))return user.send(this.Main.embeds.OKEmbed.setDescription(`${user} успешно розмучен`));
            }
        }
      })
    })
    }
  })
  } catch (error) {
    console.log(error)  
  }},3000)
setInterval(()=>{
  try {
    this.Main.db.Giveaway.find().exec((err,res)=> {
      if(err)return console.log(err);
      if(res){
      res.forEach(async Giveaway => {
        const guild = this.Main.guilds.cache.get(Giveaway.guildID)
        if(!guild)return;
        if(Giveaway.time >= Date.now()){
          Giveaway.users = await guild.channels.cache.get(Giveaway.channel).messages.fetch(Giveaway.messageID).then((v) => Array.from(v.reactions.cache.get("🎉").users.cache.filter(user => user.id != Main.user.id && !user.bot).keys()
          ));
          Giveaway.save();
        }else {
            let random = [];
            if(Giveaway.users.length){
              function shuffle(array) {
                array.sort(() => Math.random() - 0.5);
              }
              shuffle(Giveaway.users)
              random = Giveaway.users.slice(0, Giveaway.winners);
        guild.channels.cache.get(Giveaway.channel).send(GiveAway.setDescription(`Победители ${random.map(a => guild.members.cache.get(a)).join(', ')}`));
        }else{
        guild.channels.cache.get(Giveaway.channel).send(GiveAway.setDescription(`Нету победителей`));
        }
        await Giveaway.deleteOne({guildID:Giveaway.guildID,time:Giveaway.time,prize:Giveaway.prize,winners:Giveaway.winners,messageID:Giveaway.messageID,channel:Giveaway.channel})}})}}) 
      } catch (error) {
    console.log(error)
  }},3000) 
  }
}