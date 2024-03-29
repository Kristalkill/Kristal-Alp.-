const Command = require('../../Structures/Construction/Command');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ['block'],
      category: 'development',
      public: false,
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
        .first()
      );
      const reason = args.slice(1).join(' ') || language.block.param1;
      if (!member)
        return message.channel.send(
          this.Main.embeds.ErrEmbed.setDescription(language.block.param2)
        );
      const Data = this.Main.db.Block.findOne({
        id: member.id
      });
      if (Data)
        return message.channel.send(
          this.Main.embeds.Main.ErrEmbed.setDescription(
            language.block.param3.translate({
              member,
              reason: Data.reason
            })
          )
        );
      this.Main.db.Block.create({
        id: member.id,
        reason
      });
      message.channel.send(
        this.Main.embeds.OKEmbed.setDescription(
          language.block.param4.translate({
            member,
            reason
          })
        )
      );
    } catch (error) {
      console.log(error);
    }
  }
};