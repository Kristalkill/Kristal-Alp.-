const {
    MessageEmbed
} = require('discord.js');
const Command = require('../../Structures/Construction/Command');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['slap'],
            category: 'fun',
        });
    }

    async run(message, [user]) {
        console.log(user)
        const language = this.language(message.guild.settings.Moderation.language)
        const member = this.get(user, message, 'members')
        if (!member) return this.Embed.ErrorEmbed(language.nomember, message)
        message.channel.send(new MessageEmbed()
            .setColor('#FF30A2')
            .setDescription(`${message.author.username} tickle ${member.user.username}`)
            .setImage(await this.fetch('https://nekos.life/api/v2/img/tickle'))
            .setFooter(
                message.author.tag,
                message.author.displayAvatarURL({
                    dynamic: true
                })
            )
        )
    }
};