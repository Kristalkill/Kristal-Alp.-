const Event = require('../Structures/Construction/Event');
module.exports = class extends Event {
  async run(message) {
   await this.Main.utils.Message.reaction_on_message(message)
  }
};