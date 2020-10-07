const {
    MessageEmbed
} = require('discord.js');
const Command = require('../../Structures/Command');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['slap'],
            category: 'fun',
        });
    }

    async run(message, args) {
        try {
            const language = require(`../../languages/${
          message.guild.settings.Moderation.language || 'en'
        }.json`);

            const member = message.guild.member(
                message.mentions.users
                .filter((u) => u.id != message.guild.me.id)
                .first() || message.guild.members.cache.get(args[0])
            );
            if (!member)
                return message.channel.send(
                    this.Main.embeds.ErrEmbed.setDescription(language.nomember)
                );
            message.channel.send(new MessageEmbed()
                .setColor('#FF30A2')
                .setDescription(`${message.author.username} tickle ${member.user.username}`)
                .setImage(
                    await fetch('https://nekos.life/api/v2/img/tickle')
                    .then((r) => r.json())
                    .then((r) => r.url)
                )
                .setFooter(
                    message.author.tag,
                    message.author.displayAvatarURL({
                        dynamic: true
                    })
                )
            )
        } catch (error) {
            console.log(error);
        }
    }
};