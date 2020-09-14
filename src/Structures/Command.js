module.exports = class Command {
  constructor(Main, name, options = {}) {
    this.Main = Main;
    this.nsfw = options.nsfw || false;
    this.name = options.name || name;
    this.aliases = options.aliases || [];
    this.category = options.category;
    this.public = options.public;
    this.Permission = options.Permission;
    this.PermissionBOT = options.PermissionBOT;
  }

  async run(/* message, ...args */) {
    throw new Error(`Команда ${this.name} не содержин метод запуска!`);
  }
};
