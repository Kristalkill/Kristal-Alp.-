const {
    MessageEmbed
} = require('discord.js');
const Command = require('../../Structures/Construction/Command');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {});
    }

    async run(message) {
        message.channel.send(new MessageEmbed()
            .setColor("#ff69fc")
            .setDescription(`${message.author.username} smug`)
            .setImage(await this.fetch('https://nekos.life/api/v2/img/smug')))
    }
}