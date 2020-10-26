const Command = require('../../Structures/Construction/Command');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['relod'],
            category: 'development',
            public: false,
        });
    }

    async run(message, args) {
        const commandname = args[0].toLowerCase()
        const command = this.Main.commands.get(commandname) || this.Main.commands.find(cmd => {
            cmd.aliases && cmd.aliases.includes(commandname)
        })
        if (!command) return message.reply('Нету такой комманды')

        delete require.cache[require.resolve(`../${command.category}/${command.name}.js`)]

        this.Main.commands.set(command.name, new(require(`../${command.category}/${command.name}.js`))())

        return message.channel.send(`${command.name} перезагружена`)

    }
}