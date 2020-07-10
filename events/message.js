let embed = new Discord.MessageEmbed()
function managePerms(message, needPerms, addMore = false) {
  let need = [];
  if (addMore) {
    needPerms.push("EMBED_LINKS");
    needPerms.push("ADD_REACTIONS");
    needPerms.push("USE_EXTERNAL_EMOJIS");
  }
  needPerms.map((p) => !message.channel.permissionsFor(addMore ? message.guild.me : message.member).has(p) ? need.push(p) : null);
  if (need.length) return {
    need,
    embed: message.channel.permissionsFor(message.guild.me).has("EMBED_LINKS") ? true : false
  };
  else return false;
}
module.exports = (Main,message) => {
  if(message.author.bot)return;
  Block.findOne({id: message.author.id},(err,BlockY)=> {
  User.findOne({guildID: message.guild.id, userID: message.author.id},(err,Data)=> {
  Guild.findOne({guildID: message.guild.id},(err,res) => {
  if(err){console.log(err);
  if(!Data){
    let user = new User({guildID:message.guild.id, userID:message.author.id})
    user.save()
     }
   if(!res){
    let guild = new Guild({guildID: message.guild.id,ownerID:message.guild.ownerid})
    guild.save()
   }
   if(BlockY){ 
   message.react("⏪");
   }
   else{
    Data.xp += res.Economy.xp
    Data.money += res.Economy.money
    Data.massages++
    addAchievement(Data.level >= 5,'3',Data,message)
    addAchievement(Data.money >= 1000,'2',Data,message)
    if(Data.xp >= res.Economy.upXP*Data.level){
    Data.xp -= res.Economy.upXP*Data.level;
    Data.level+=1
    message.channel.send(embed.setDescription(`Поздравим **${message.author.username}** с ${Data.level} уровнем!`))}
    Data.save();
    if(!message.content.startsWith(res.Moderation.prefix))return;
    const args = message.content.slice(res.Moderation.prefix.length).trim().split(/ +/g);
    const cmdName = args.shift().toLowerCase();
    const command = Main.commands.get(cmdName) || Main.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdName));
    const cooldown = cooldowns.get(message.author.id);
    if (cooldown) {
      const remaining = humanizeDuration(cooldown - Date.now(),{ round: true,language: "ru"  });
      return message.channel.send(ErrEmbed.setDescription(`Подождите ${remaining} прежде чем использывть снова`))
    }
    else{
    if(!command)return;
    if(!config.owner.includes(message.author.id)){
    cooldowns.set(message.author.id, Date.now() + 5000);
    setTimeout(() => cooldowns.delete(message.author.id), 5000);
    }
    managePerms(message, command.PermissionBOT, true)
    command.execute(Main, message, args,res,Data,err);
}
}
}
})
})
})
}