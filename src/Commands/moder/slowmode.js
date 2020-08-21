const ms = require('ms')
const Command = require('../../Structures/Command');
module.exports = class extends Command {
      constructor(...args) {
          super(...args, {
              aliases: ['slowmode'],
              category: 'moder',
              Permission:["MANAGE_CHANNELS"],
              PermissionBOT:["MANAGE_CHANNELS"],
          });
      }
       run(message,args) {
        try {
            if(!args[0]||!parseInt(args[0]))return  message.channel.send(this.Main.embeds.ErrEmbed.setDescription('Веддите время'))
            if(!ms(args[0])/1000 < 21600000)return  message.channel.send(this.Main.embeds.ErrEmbed.setDescription('Максимальное время слоумода 6 часов'))
            else{
                message.channel.setRateLimitPerUser(ms(args[0])/1000)
                message.channel.send(this.Main.embeds.OKEmbed.setDescription(`Slowmode в ${message.channel} установлен на ${`\`${args[0]}\``}`))
            }
        } catch (error) {
            console.log(error)
        }
    }
}