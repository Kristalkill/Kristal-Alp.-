const Command = require('../../Structures/Command');
const Discord = require('discord.js')
module.exports = class extends Command {
  constructor(...args) {
      super(...args, {
          aliases: ['prefix'],
          Permission:["ADMINISTRATOR"],
      });
  }
  async run(message,language,args) {
    try {
      let res = await this.Main.db.Guild.findOne({guildID: message.guild.id})
        if(err)return console.log(err)
        let member =  message.guild.member(message.author);
         if(args[0]){
          res.Moderation.prefix = args[0]
          res.save()
          let embed = new Discord.MessageEmbed()
          .setTitle(language.prefix.params.param1)
          .setDescription(language.prefix.params.param2.translate({member:member.user.username,args:args[0]}))
          message.channel.send(embed)
        }else return message.channel.send(this.Main.embeds.ErrEmbed.setDescription(language.prefix.params.param3))
    } catch (error) {
      console.log(error)
    }
  }}
