const Event = require('../Structures/Construction/Event');

module.exports = class extends Event {
  async run(guild) {
    try {
      this.Main.db.Guild.d({
        guildID: guild.id
      });
    } catch (error) {
      console.log(error);
    }
  }
};