const {
    MessageEmbed
} = require('discord.js');
const Command = require('../../Structures/Construction/Command');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {});
    }
    async run(message) {
        const all = message.guild.members.cache.filter(m => m.user.bot === false).size
        const online = message.guild.presences.cache.filter(x => ['online', 'idle', 'dnd'].includes(x)).size
        const offline = all - online;
        message.channel.send(new MessageEmbed()
            .setThumbnail(message.guild.iconURL({
                dynamic: true
            }))
            .addField(`Server info`,
                `Name/ID: ${message.guild.name} (\`${message.guild.id}\`)
                Owner: ${message.guild.owner} (\`${message.guild.owner.id}\`)
                VerificationLevel: \`${message.guild.verificationLevel}\`
                Region: \`${message.guild.region}\`
                System Channel: ${message.guild.systemChannel ||  'None' }`
            )
            .addField(`Members [${message.guild.membersCount}]`,
                `Members: **${all}**
                Online: **${online}**
                Offline: **${offline}**
                Bots: **${message.guild.membersCount - all}**`, true
            )
            .addField(`Channels [${message.guild.channels.cache.size}]`,
                `Text: **${message.guild.channels.cache.filter(c => c.type == 'text').size}**
                Voice:  **${message.guild.channels.cache.filter(c => c.type == 'voice').size}**
                Category: **${message.guild.channels.cache.filter(c => c.type == 'category').size}**`, true)
            .addField(`Stats`,
                `Roles amount: **${message.guild.roles.cache.size}**
                Voice online: **${message.guild.members.cache.filter(m => m.voice.channel).size}**
                Emojis amount: **${message.guild.emojis.cache.size}**`, true)
            .setFooter(`Дизайн спижжен у  MrVaDiM4iK`)
            .setTimestamp())
    }
}