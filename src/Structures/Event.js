module.exports = class Event {

	constructor(Main, name, options = {}) {
		this.name = name;
		this.Main = Main;
		this.type = options.once ? 'once' : 'on';
		this.emitter = (typeof options.emitter === 'string' ? this.Main[options.emitter] : options.emitter) || this.Main;
	}
	async run(...args) {
		throw new Error(`The run method has not been implemented in ${this.name}`);
	}

};
