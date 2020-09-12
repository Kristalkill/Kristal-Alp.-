const Command = require('../../Structures/Command');
const Discord = require('discord.js');
module.exports = class extends Command {
  constructor(...args) {
      super(...args, {
          aliases: ['prefix'],
          Permission:["ADMINISTRATOR"],
      });
  }
  async run(message,args) {
    try {
           const language = require(`../../languages/${message.guild.settings.Moderation.language ||"en"}.json`);

          let member =  message.guild.member(message.author);
         if(args[0]){
          message.guild.settings.Moderation.prefix = args[0].toLowerCase()
          let embed = new Discord.MessageEmbed()
          .setTitle(language.prefix.params.param1)
          .setDescription(language.prefix.params.param2.translate({member:member.user.username,args:args[0]}))
          message.channel.send(embed)
        }else return message.channel.send(this.Main.embeds.ErrEmbed.setDescription(language.prefix.params.param3))
    } catch (error) {
      console.log(error)
    }
  }}
