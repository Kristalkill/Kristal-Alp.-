const Discord = require('discord.js');
const Command = require('../../Structures/Construction/Command');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ['avatar'],
      category: 'fun',
    });
  }

  async run(message) {
    try {
      const language = require(`../../languages/${
        message.guild.settings.Moderation.language || 'en'
      }.json`);
      const user = message.mentions.users.first()
        ? message.mentions.users.first()
        : message.author;
      const AvatarEmbed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`${language.avatar.params.param1} ${user.username}!`)
        .setImage(user.avatarURL({ dynamic: true }));
      await message.channel.send(AvatarEmbed);
    } catch (error) {
      console.log(error);
    }
  }
};
