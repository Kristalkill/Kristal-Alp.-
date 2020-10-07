const Event = require('../Structures/Construction/Event');

module.exports = class extends Event {
  async run(guild) {
    try {
      if (
        !guild.me.hasPermission([
          'ADD_REACTIONS',
          'VIEW_CHANNEL',
          'SEND_MESSAGES',
          'USE_EXTERNAL_EMOJIS',
        ])
      )
        return guild.owner.send(
          this.Main.embeds.ErrEmbed.setDescription(
            `**К сожелению у бота нету прав:  \`${[
              'ADD_REACTIONS',
              'VIEW_CHANNEL',
              'SEND_MESSAGES',
              'USE_EXTERNAL_EMOJIS',
            ]}\`\nЯ не могу исполнить вашу команду.**`
          )
        );
      this.Main.db.Guild.create({
        guildID: guild.id,
        ownerID: guild.ownerid
      });
    } catch (error) {
      console.log(error);
    }
  }
};