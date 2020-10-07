const Command = require('../../Structures/Construction/Command');
const {
    MessageEmbed
} = require('discord.js')
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['achievement'],
        });
    }

    async run(message, args) {
        if (!args[0]) return this.Embed.ErrorEmbed(`Provide text`, message)
        let embed = new MessageEmbed()
            .setAuthor(`${message.author.username1}`, message.author.displayAvatarURL({
                dynamic: true
            }))
            .setColor("RANDOM")
            .setImage(`https://api.alexflipnote.dev/achievement?text=${args[0]}`)
            .setTimestamp()
        message.channel.send(embed)
    }
}