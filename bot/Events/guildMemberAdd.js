const Event = require('../Structures/Construction/Event');

module.exports = class extends Event {
  async run(member) {
    try {
      if (member.user.bot) return
      if (member.guild.options.logs) member.guild.channels.get(member.guild.options.logs).send(`New user: ${member}`)
      this.Main.db.User.create({
        guildID: member.guild.id,
        userID: member.id
      });
    } catch (error) {
      console.log(error);
    }
  }
};