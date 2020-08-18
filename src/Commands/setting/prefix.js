const Command = require('../../Structures/Command');
const Discord = require('discord.js')
module.exports = class extends Command {
  constructor(...args) {
      super(...args, {
          aliases: ['unwarn'],
          description: 'unwarn',
          category: 'moder',
          Permission:["ADMINISTRATOR"],
      });
  }
  run(message,args) {
    try {
      this.Main.db.Guild.findOne({guildID: message.guild.id},(err,res) => {
        if(err)return console.log(err)
        let member =  message.guild.member(message.author);
         if(args[0]){
          res.Moderation.prefix = args[0]
          res.save()
          let embed = new Discord.MessageEmbed()
          .setTitle('Префикс успешно изменен')
          .setDescription(`Префикс успешно был изменен на \`${args[0]}\`,его изменил ${member.user.username}`)
          message.channel.send(embed)
        }
        else{
          let embed = new Discord.MessageEmbed()
          .setDescription(`Ваш префикс ${res.Moderation.prefix}\nЧтобы установить префикс вводите \`${res.Moderation.prefix}prefix знак\` `)
          message.channel.send(embed)
        }
      })
    } catch (error) {
      console.log(error)
    }
  }}
