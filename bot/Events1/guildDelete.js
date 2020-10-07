const Event = require('../Structures/Event');

module.exports = class extends Event {
  async run(guild) {
    try {
      this.Main.db.Guild.deleteOne({ guildID: guild.id });
    } catch (error) {
      console.log(error);
    }
  }
};
