const Event = require('../Structures/Event');
module.exports = class extends Event {
	async run() {
	const PORT = 4000
    console.log(`[✅Bot] ${this.Main.user.tag} Запущен на ${PORT}!`)
  }
}