const Discord = require('discord.js');
const Command = require('../../Structures/Construction/Command');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ['roll'],
      category: 'fun',
    });
  }

  run(message, args) {
    try {
      const language = require(`../../languages/${
        message.guild.settings.Moderation.language || 'en'
      }.json`);
      let num1 = 0;
      let num2 = 100;
      if (args[0] && args[1]) {
        num1 = this.Main.utils.toNum(args[0]);
        num2 = this.Main.utils.toNum(args[1]);
      }
      const random = Math.floor(Math.random() * (num2 - num1)) + num1;
      if (random > 9999999)
        return message.channel.send(
          this.Main.embeds.ErrEmbed.setDescription(language.roll.params.param1)
        );
      const embed = new Discord.MessageEmbed()
        .setColor('#70FF0D')
        .setTitle(
          language.roll.params.param2.translate({ num1, num2, random })
        );
      message.channel.send(embed);
    } catch (error) {
      console.log(error);
    }
  }
};
