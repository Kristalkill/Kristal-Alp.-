const Command = require('../../Structures/Construction/Command');
module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ['ban'],
      category: 'moder',
      Permission: ['BAN_MEMBERS'],
      PermissionBOT: ['BAN_MEMBERS'],
    });
  }

  run(message, args) {
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
      if (member.bannable === true) {
        const days = parseInt(args[2]) || Infinity;
        const reason = args[1] || language.undefined;
        member.ban({
          days,
          reason
        });
        message.channel.send(
          this.Main.embeds.OKEmbed.setDescription(
            language.ban.params.param1.translate({
              name: member.user.name,
              days,
              reason,
            })
          )
        );
      } else
        return message.channel.send(
          this.Main.embeds.ErrEmbed.setDescription(language.ban.params.param2)
        );
    } catch (error) {
      console.log(error);
    }
  }
};