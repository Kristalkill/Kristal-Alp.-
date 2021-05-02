const Command = require('../../Structures/Construction/Command');
const {MessageEmbed} = require("discord.js");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {});
    }

    async run(message) {
        message.channel.send(new MessageEmbed().setTitle('Vote').setDescription('123'.repeat(20)).addFields(
            {name: '** **', value: '[TopGG](https://top.gg/)', inline: true},
            {name: '** **', value: '[TopGG](https://top.gg/)', inline: true},
            {name: '** **', value: '[TopGG](https://top.gg/)', inline: true},
            {name: '** **', value: '** **'},
            {name: '** **', value: '[TopGG](https://top.gg/)', inline: true},
            {name: '** **', value: '[TopGG](https://top.gg/)', inline: true},
            {name: '** **', value: '[TopGG](https://top.gg/)', inline: true},
            {name: '** **', value: '** **'},
            {name: '** **', value: '[TopGG](https://top.gg/)', inline: true},
            {name: '** **', value: '[TopGG](https://top.gg/)', inline: true},
            {name: '** **', value: '[TopGG](https://top.gg/)', inline: true}
        ))
    }
}