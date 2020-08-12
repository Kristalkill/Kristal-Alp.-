let embed = new Discord.MessageEmbed()
let embed1 = new Discord.MessageEmbed()
module.exports = (Main,message) => {
  try {
    if(message.channel.type === 'dm')return;
    if(message.author.bot)return;
    Block.findOne({id: message.author.id},(err,BlockY)=> {
    User.findOne({guildID: message.guild.id, userID: message.author.id},(err,Data)=> {
    Guild.findOne({guildID: message.guild.id},(err,res) => {
    if(err){console.log(err)};
    if(!Data) return User.create({guildID:message.guild.id, userID:message.author.id})
    if(!res) return Guild.create({guildID: message.guild.id,ownerID:message.guild.ownerid})
    const language = require(`./../languages/${res.Moderation.language}.js`);
    var prefixes = [`${message.guild.me}`,`${res.Moderation.prefix}`]
    let prefix = false;
    for (const thisPrefix of prefixes) {
      if (message.content.toLowerCase().startsWith(thisPrefix)) prefix = thisPrefix;
  }
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmdName = args.shift().toLowerCase();
    const command = Main.commands.get(cmdName) || Main.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdName));
    if(BlockY && command){ 
     message.react("733299144311177257");}
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
      if(command.public === false)return; 
      if(!message.member.hasPermission(command.Permission))return  message.channel.send(ErrEmbed.setDescription(`**К сожелению у вас нету прав: \`${command.Permission}\`\nЯ не могу исполнить вашу команду.**`));
      cooldowns.set(message.author.id, Date.now() + 5000);
      setTimeout(() => cooldowns.delete(message.author.id), 5000);
      };
      if(!message.guild.me.hasPermission(["ADD_REACTIONS","VIEW_CHANNEL","SEND_MESSAGES","USE_EXTERNAL_EMOJIS"]))return message.guild.owner.send(ErrEmbed.setDescription(`**К сожелению у бота нету прав:  \`${["ADD_REACTIONS","VIEW_CHANNEL","SEND_MESSAGES","USE_EXTERNAL_EMOJIS"]}\`\nЯ не могу исполнить вашу команду.**`));
      if(!message.guild.me.hasPermission(command.PermissionBOT))return  message.channel.send(ErrEmbed.setDescription(`**К сожелению у бота нету прав:  \`${command.PermissionBOT}\`\nЯ не могу исполнить вашу команду.**`));
      command.execute(Main, message, args,res,Data,err);}
      if(message.content.startsWith(message.guild.me)&& !command){
      message.channel.send(embed1.setTitle(`**Префикс бота:** ${res.Moderation.prefix}`));}
  }
  })
  })
  })
  }catch (error) {
    console.log(error)
  }}