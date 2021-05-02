const Command = require('../../Structures/Construction/Command');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ['set'],
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
          this.Main.embeds.ErrEmbed.setDescription(language.nomember)
        );
      const data =
        message.author.id === member.id
          ? message.member.options
          : await this.Main.db.User.findOne({
              guildID: message.guild.id,
              userID: member.user.id,
            });
      if (
        args[2] &&
        args[1] &&
        ['level', 'money', 'rep', 'xp'].includes(args[1].toLowerCase())
      ) {
          message.channel.send(
              this.Main.embeds.OKEmbed.setDescription(
                  language.set.params.param1.translate({
                      arg1: args[1],
                      arg2: args[2],
                      name: member.user.username,
                  })
              )
          );
          data[args[1].toLowerCase()] = parseInt(args[2]);
          if (message.author.id === member.id) {
              data.save()
          }
      } else if (!args[1]) {
        message.channel.send(
          this.Main.embeds.ErrEmbed.setDescription(language.set.params.param2)
        );
      } else
        return message.channel.send(
          this.Main.embeds.ErrEmbed.setDescription(
            language.set.params.param3.translate({ arg0: args[2] })
          )
        );
    } catch (error) {
      console.log(error.stack);
    }
  }
};
