const Command = require('../../Structures/Command');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ['clear'],
      category: 'moder',
      Permission: ['MANAGE_MESSAGES'],
      PermissionBOT: ['MANAGE_MESSAGES'],
    });
  }

  async run(message, args) {
    try {
      const language = require(`../../languages/${
        message.guild.settings.Moderation.language || 'en'
      }.json`);

      const amount = args[0];
      if (isNaN(amount) || 1 < amount > 100)
        return message.channel.send(
          this.Main.embeds.ErrEmbed.setDescription(language.clear.params.param1)
        );
      message.channel.messages.fetch({ limit: amount }).then(
        function (list) {
          message.channel.bulkDelete(list);
          message.channel.send(
            this.Main.embeds.OKEmbed.setDescription(
              language.clear.params.param2.translate({ size: list.size })
            )
          );
        }.catch((error) =>
          message.reply(`Произошла ошибка очистки сообщений: ${error}`)
        )
      );
    } catch (error) {
      console.log(error);
    }
  }
};
