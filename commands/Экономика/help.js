const Discord = module.require('discord.js');
module.exports = async (bot, message, args) => {
    try {
        let helpembed = new Discord.RichEmbed()
        .setTitle('Помощь')
        .setDescription('**Если хотите узнать поподробнее о команде напишите `!help` __`команда`__**')
        .setColor('5CCFFF');
        /**
         * @description отправить сообщение со всем списком команд
         */
        function sendCommandList(message) {
            //message.channel.send(require('util').inspect(bot.commands));
            cmdlist = []
            commands = []
            command_names = []

            //ForEach start
            const modules = bot.commands.map(command => command.help.category).filter((m, i, self) => self.indexOf(m) === i).forEach(category => {
                cmds = bot.commands.filter(command => command.help.category === category);

                command_names = []
                cmds.forEach(e => {
                    if(!owners.includes(message.author.id) && e.help.owneronly == true){
                        command_names.push(`~~\`${e.help.name}\`~~`)
                    }else{
                        command_names.push(`**\`${e.help.name}\`**`)
                    }


                });
                command_names = command_names.join(' ')
                helpembed.addField(`**${category}**`, `${command_names}`, false);
              });//ForEach end
              message.channel.send(helpembed)

        }

        function sendCommandInfo(commandName) {
            let errEmbed = new Discord.RichEmbed()

            let command = bot.commands.get(commandName) || bot.commands.get(bot.aliases.get(commandName));
            if(!command) {
                bot.sendErrEmbed(errEmbed, `Такой команды нет`)
                    return message.channel.send(errEmbed)
            }

            const usages = []
            if(!command.help.usages){
                usages.append('Нет примеров использования')
            }else{
                Object.keys(command.help.usages).forEach(e => {
                    usages.push(`\`${e}\` => \`${command.help.usages[e]}\``)
                })
            }

            let cmdEmbed = new Discord.RichEmbed()
            .setTitle(`Информация о \`!${command.help.name}\``)
            .setDescription(`**${command.help.description}**`)
            .addField('Алиасы', `**${command.help.aliases.join(', ')}**`, false)
            .addField('Использования', `**${usages.join('\n')}**`)
            .setColor('FF7A47');

            message.channel.send(cmdEmbed)

        }
        let cmd = args[0];
        if (!cmd) return sendCommandList(message);
        sendCommandInfo(cmd);
    } catch (err) {
        bot.logsErr(err)
    }
};
module.exports.help = {
    name: 'help',
    aliases: ['хелп', 'помощь'],
    description: 'Показать список команд / Показать описание команды',
    usages: { '!help': 'Показать весь список команд', '!help kick': 'Показать информацию о команду !kick' },
    category: "Информация о боте"
};
