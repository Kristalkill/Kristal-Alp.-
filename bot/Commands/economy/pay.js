const Command = require('../../Structures/Construction/Command');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ['pay'],
      category: 'economy',
    });
  }

  async run(message, args) {
    try {
      const language = require(`../../languages/${
        message.guild.settings.Moderation.language || 'en'
      }.json`);

      const member = message.guild.member(
        message.mentions.users
          .filter((u) => u.id !== message.guild.me.id)
          .first() || message.guild.members.cache.get(args[0])
      );
      if (!member)
        return message.channel.send(
          this.Main.embeds.ErrEmbed.setDescription(language.pay.params.param1)
        );
      if (!args[1])
        return message.channel.send(
          this.Main.embeds.ErrEmbed.setDescription(language.pay.params.param2)
        );
      if (args[1] < 1)
        return message.channel.send(
          this.Main.embeds.ErrEmbed.setDescription(language.pay.params.param3)
        );
      if (isNaN(args[1]))
        return message.channel.send(
          this.Main.embeds.ErrEmbed.setDescription(language.pay.params.param4)
        );
      const data = await this.Main.db.User.findOne({
        guildID: message.guild.id,
        userID: member.id,
      });
      if (!data)
        return message.channel.send(
          this.Main.embeds.ErrEmbed.setDescription(
            language.pay.params.param5.translate({ member: member.user.tag })
          )
        );
      if (message.member.options.money < args[1])
        return message.channel.send(
          this.Main.embeds.ErrEmbed.setDescription(language.pay.params.param6)
        );
      if (message.author.id === member.id)
        return message.channel.send(
          this.Main.embeds.ErrEmbed.setDescription(language.pay.params.param7)
        );
      if (member.user.bot)
        return message.channel.send(
          this.Main.embeds.ErrEmbed.setDescription(language.pay.params8)
        );
      message.member.options.money -= Math.floor(parseInt(args[1]));
      data.money += Math.floor(parseInt(args[1]));
      data.save();
      message.channel.send(
        this.Main.embeds.OKEmbed.setDescription(
          language.pay.params.param9.translate({
            member: member.user.username,
            author: message.author.username,
            args1: args[1],
          })
        )
      );
    } catch (error) {
      console.log(error.stack);
    }
  }
};
