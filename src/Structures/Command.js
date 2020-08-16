module.exports = class Command {

	constructor(Main, name, options = {}) {
		this.Main = Main;
		this.name = options.name || name;
		this.aliases = options.aliases || [];
		this.description = options.description || 'Нету.';
		this.category = options.category || 'Тест';
		this.usage = options.usage || 'Нету.';
		this.public = null ? true : options.public;
	}
	async run(message, args) {
		throw new Error(`Команда ${this.name} не содержин метод запуска!`);
	}

};
