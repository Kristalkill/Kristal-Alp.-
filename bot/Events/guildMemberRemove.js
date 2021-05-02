const Event = require('../Structures/Construction/Event');

module.exports = class extends Event {
  async run(member) {
    try {
      if (member.user.bot) return null;
      if (member.guild.options.logs) member.guild.channels.get(member.guild.options.logs).send(`User leave: ${member}`)
      this.Main.db.User.remove({
        guildID: member.guild.id,
        userID: member.id,
      });
    } catch (error) {
      console.log(error);
    }
  }
};