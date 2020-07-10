module.exports = (Main, oldmessage,message) => {
    if(message.author.bot)return;
    Block.findOne({id: message.author.id},(err,BlockY)=> {
    User.findOne({guildID: message.guild.id, userID: message.author.id},(err,Data)=> {
    Guild.findOne({guildID: message.guild.id},(err,res) => {
   if(err){console.log(err);}
   if(!Data){
      let user = new User({guildID:message.guild.id, userID:message.author.id})
        user.save()
   }
    if(!res){
        let guild = new Guild({guildID: message.guild.id,ownerID:message.guild.ownerid})
        guild.save()
      }
  if(Data&&res){
  Data.xp += res.Economy.xp
  Data.money += res.Economy.money
  Data.massages++
  addAchievement(Data.level >= 5,'3',Data,message)
  addAchievement(Data.money >= 1000,'2',Data,message)
  if(Data.xp >= res.Economy.upXP*Data.level){
  Data.xp -= res.Economy.upXP*Data.level;
  Data.level+=1
  let embed = new Discord.MessageEmbed()
  .setDescription(`Поздравим **${message.author.username}** с ${Data.level} уровнем!`);
  message.channel.send(embed);
  }
  Data.save()
  if(message.guild.member(message.mentions.users.first()) == message.guild.me &&  !message.content.startsWith(res.Moderation.prefix)){
    let BotEmbed = new Discord.MessageEmbed()
    .setTitle(`**Префикс бота:** ${res.Moderation.prefix}`);
    message.channel.send(BotEmbed)
   }
  if(!message.content.startsWith(res.Moderation.prefix))return;
  const args = message.content.slice(res.Moderation.prefix.length).trim().split(/ +/g);
  const cmdName = args.shift().toLowerCase();
  const command = Main.commands.get(cmdName) || Main.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdName));
  if(!command)return;
  if(BlockY)return message.react("⏪");
  if(!BlockY){
  if(!message.guild.me.hasPermission(command.PermissionBOT))return message.guild.owner.send(ErrEmbed.setDescription(`**К сожелению у бота нету прав:` `\`${command.PermissionBOT}\` Я не могу исполнить вашу команду.`));
  if(!config.owner.includes(message.author.id) && command.public === false) return;
  if(!config.owner.includes(message.author.id)&&(!message.guild.owner.user)&&(!member.hasPermission(command.Permission)))return message.reply(ErrEmbed.setDescription(`**К сожелению у вас нету прав:` `\`${command.Permission}\` Я не могу исполнить вашу команду.`));
  command.execute(Main, message, args,res,Data,err);
  }
  }
  })
  })
  })
};