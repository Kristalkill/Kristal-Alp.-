const Event = require('../Structures/Event');
const Discord = require('discord.js')
const config = require('../../config.json');
const humanizeDuration = require('humanize-duration')
let embed = new Discord.MessageEmbed()
let embed1 = new Discord.MessageEmbed()
module.exports = class extends Event {
	async run(message) {
    try {
      if(message.channel.type === 'dm' || message.author.bot)return;
      let BlockY = await this.Main.db.Block.findOne({id: message.author.id})
      let Data = await this.Main.db.User.findOne({guildID: message.guild.id, userID: message.author.id})
      let res = await this.Main.db.Guild.findOne({guildID: message.guild.id})
      if(!Data) await this.Main.db.User.create({guildID:message.guild.id, userID:message.author.id})
      if(!res)  await this.Main.db.Guild.create({guildID: message.guild.id,ownerID:message.guild.ownerid})
      var prefixes = ["<@704604456313946182>", "<@!704604456313946182>",`${res.Moderation.prefix}`]
      let prefix = false;
      for (const thisPrefix of prefixes) {
        if (message.content.toLowerCase().startsWith(thisPrefix)) prefix = thisPrefix;
    }
    const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = this.Main.commands.get(cmd.toLowerCase()) || this.Main.commands.get(this.Main.aliases.get(cmd.toLowerCase()));
      if(BlockY && command)return message.react("733299144311177257");
      if(Data && res){
        const language = await require(`./../languages/${res.Moderation.language ||"en"}.json`);
        Data.xp += res.Economy.xp
        Data.money += res.Economy.money
        Data.massages++
        this.Main.utils.addAchievement(Data.level >= 5,'3',Data,message)
        this.Main.utils.addAchievement(Data.money >= 1000,'2',Data,message)
        if(Data.xp >= res.Economy.upXP*Data.level){
        Data.xp -= res.Economy.upXP*Data.level;
        Data.level+=1
        message.channel.send(embed.setDescription(language.message.levelup.translate({name:message.author.username,level:Data.level})))}
        Data.save();
        if(message.content.startsWith("<@704604456313946182>"||"<@!704604456313946182>") && !command){
          message.channel.send(embed1.setTitle(`${language.message.param2} ${res.Moderation.prefix}`));
        }
        else if(prefix && command){
        message.guild.me.hasPermission(["SEND_MESSAGES"]) ? null : message.author.send(this.Main.embeds.ErrEmbed.setDescription(language.message.perms1)).catch()
        const cooldown = this.Main.db.cooldowns.get(message.author.id);
        if (cooldown) return message.channel.send(this.Main.embeds.ErrEmbed.setDescription(language.message.param1.translate({time:humanizeDuration(cooldown - Date.now(),{ round: true,language: res.Moderation.language})})))
        if(!config.owner.includes(message.author.id)){
        if(command.public === false)return; 
        this.Main.db.cooldowns.set(message.author.id, Date.now() + 5000);
        setTimeout(() => this.Main.db.cooldowns.delete(message.author.id), 5000);
        const Uneed = this.Main.utils.managePerms(message, command.Permission,false)
        if(Uneed)return message.channel.send(this.Main.embeds.ErrEmbed.setDescription(language.message.perms2.translate({need:Uneed})));
        };
        const Bneed = this.Main.utils.managePerms(message, command.PermissionBOT,true)
        if(Bneed)return message.channel.send(this.Main.embeds.ErrEmbed.setDescription(language.message.perms2.translate({need:Bneed})));
        command.run(message,language,args);
    }
  }
}catch (error) {
  console.log(error)
}
}}