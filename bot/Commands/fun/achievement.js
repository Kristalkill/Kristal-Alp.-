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

    async run(message, [text]) {
        if (!text) return this.Embed.ErrorEmbed(`Provide text`, message)
        message.channel.send(new MessageEmbed()
            .setAuthor(`${message.author.username}`, message.author.displayAvatarURL({
                dynamic: true
            }))
            .setColor("RANDOM")
            .setImage(`https://api.alexflipnote.dev/achievement?text=${text}`)
            .setTimestamp())
    }
}