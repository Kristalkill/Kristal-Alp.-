const Event = require('../Structures/Event');
module.exports = class extends Event {
  constructor(...args) {
		super(...args, {
			once: true
		});
	}

	async run() {
	const PORT = 4000
    console.log(`[✅Bot] ${this.Main.user.tag} Запущен на ${PORT}!`)
  }
}