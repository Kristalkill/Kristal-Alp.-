const Event = require('../Structures/Event');
const Discord = require('discord.js')
const config = require('../../config.json');
let embed = new Discord.MessageEmbed()
let embed1 = new Discord.MessageEmbed()
module.exports = class extends Event {
	async run(olemessage,message) {
    try {
      if(message.channel.type === 'dm' || message.author.bot)return;
      this.Main.db.Block.findOne({id: message.author.id},(err,BlockY)=> {
      this.Main.db.User.findOne({guildID: message.guild.id, userID: message.author.id},(err,Data)=> {
      this.Main.db.Guild.findOne({guildID: message.guild.id},(err,res) => {
      if(err){console.log(err)};
      if(!Data) return this.Main.db.User.create({guildID:message.guild.id, userID:message.author.id})
      if(!res) return this.Main.db.Guild.create({guildID: message.guild.id,ownerID:message.guild.ownerid})
      const language = require(`./../languages/${res.Moderation.language}.json`);
      var prefixes = [`${message.guild.me}`,`${res.Moderation.prefix}`]
      let prefix = false;
      for (const thisPrefix of prefixes) {
        if (message.content.toLowerCase().startsWith(thisPrefix)) prefix = thisPrefix;
    }
    const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = this.Main.commands.get(cmd.toLowerCase()) || this.Main.commands.get(this.Main.aliases.get(cmd.toLowerCase()));
      if(BlockY && command){ 
       message.react("733299144311177257");
      }
       else if(Data && res){
        Data.xp += res.Economy.xp
        Data.money += res.Economy.money
        Data.massages++
        if(Data.xp >= res.Economy.upXP*Data.level){
        Data.xp -= res.Economy.upXP*Data.level;
        Data.level+=1
        message.channel.send(embed.setDescription(language.levelup.translate({name:message.author.username,level:Data.level})))}
        Data.save();
        if(prefix && command){
        message.guild.me.hasPermission(["SEND_MESSAGES"]) ? null : message.author.send(this.Main.embeds.ErrEmbed.setDescription(`**К сожелению у бота нету права  \`${["SEND_MESSAGES"]}\`\nПрошу выдать мне это право,иначе бот будет бесполезен**`)).catch()
        const cooldown = this.Main.db.cooldowns.get(message.author.id);
        if (cooldown) return message.channel.send(this.embeds.ErrEmbed.setDescription(`Подождите ${humanizeDuration(cooldown - Date.now(),{ round: true,language: res.language  })} прежде чем использывть снова`))
        if(!config.owner.includes(message.author.id)){
        if(command.public === false)return; 
        this.Main.db.cooldowns.set(message.author.id, Date.now() + 5000);
        setTimeout(() => this.Main.db.cooldowns.delete(message.author.id), 5000);
        this.Main.utils.managePerms(message, command.Permission,false)
        };
        this.Main.utils.managePerms(message, command.PermissionBOT,true)
        command.run(message, args);
        if(message.content.startsWith(message.guild.me)&& !command){
        message.channel.send(embed1.setTitle(`**Префикс бота:** ${res.Moderation.prefix}`));
      }
    }
    }
  })
  })
  })
}catch (error) {
  console.log(error)
}
}}