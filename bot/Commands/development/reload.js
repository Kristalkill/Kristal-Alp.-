const Command = require('../../Structures/Construction/Command');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['reload'],
            category: 'development',
            public: false,
        });
    }

    async run(message, args) {
        const command_name = args[0].toLowerCase()
        const command = this.Main.commands.get(command_name) || this.Main.commands.find(cmd => {
            cmd.aliases && cmd.aliases.includes(command_name)
        })
        if (!command) return message.reply('Нету такой комманды')

        delete require.cache[require.resolve(`../${command.category}/${command.name}.js`)]
        const File = require(`../${command.category}/${command.name}.js`);
        if (!this.Main.utils.isClass(File))
            throw new TypeError(`Команда ${name} не экспортирует класс.!`);
        const command_reload = new File(this.Main, command_name.toLowerCase());
        if (!(command_reload instanceof Command))
            throw new TypeError(`Команда ${name} не принадлежит командам.`);
        command_reload.category === undefined ? (command_reload.category = command.category) : null;
        await this.Main.commands.set(command_reload.name, command_reload);
        if (command_reload.aliases.length) {
            for (const alias of command_reload.aliases) {
                this.Main.aliases.set(alias, command_reload.name);
            }
        }
        return message.channel.send(`${command_reload.name} перезагружена`)

    }
}