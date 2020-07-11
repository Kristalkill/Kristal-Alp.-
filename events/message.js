let embed = new Discord.MessageEmbed()
let embed1 = new Discord.MessageEmbed()
module.exports = (Main,message) => {
  if(message.author.bot)return;
  Block.findOne({id: message.author.id},(err,BlockY)=> {
  User.findOne({guildID: message.guild.id, userID: message.author.id},(err,Data)=> {
  Guild.findOne({guildID: message.guild.id},(err,res) => {
  const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  var prefixes = [`${message.guild.me}`,`${res.Moderation.prefix}`]
  let prefix = false;
  for (const thisPrefix of prefixes) {
    if (message.content.toLowerCase().startsWith(thisPrefix)) prefix = thisPrefix;
}
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmdName = args.shift().toLowerCase();
  const command = Main.commands.get(cmdName) || Main.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdName));
  if(err){console.log(err)};
  if(!Data){
    let user = new User({guildID:message.guild.id, userID:message.author.id})
    user.save()
     }
   if(!res){
    let guild = new Guild({guildID: message.guild.id,ownerID:message.guild.ownerid})
    guild.save()
   }
   else if(BlockY && command){ 
   message.react("⏪");}
   else if(Data && res){
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
    if(prefix && command){
    const cooldown = cooldowns.get(message.author.id);
    if (cooldown) {
        const remaining = humanizeDuration(cooldown - Date.now(),{ round: true,language: "ru"  });
        return message.channel.send(ErrEmbed.setDescription(`Подождите ${remaining} прежде чем использывть снова`))}
    if(!config.owner.includes(message.author.id)){
    cooldowns.set(message.author.id, Date.now() + 5000);
    setTimeout(() => cooldowns.delete(message.author.id), 5000);}
    command.execute(Main, message, args,res,Data,err);}
    if(message.mentions.users.first() == message.guild.me && !command){
    message.channel.send(embed.setTitle(`**Префикс бота:** ${res.Moderation.prefix}`));}
}
})
})
})
}