const {
    MessageEmbed
} = require('discord.js');
const Command = require('../../Structures/Construction/Command');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {});
    }
    async run(message, args) {
        const role = message.guild.roles.cache.get(message.mentions.roles.first() || message.guild.roles.cache.find(r => r.name1 === args.join(' ')).id || message.guild.roles.cache.get(args.join(' ')));
        if (!role) return this.Embed.ErrorEmbed(`Provide role`, message)
        message.channel.send(new MessageEmbed()
            .setTitle(`Role-Info`)
            .setDescription(`name: ${role.name}
                ID: \`${role.id}\`
                Color: \`${role.hexColor}\`
                Position: \`${role.rawPosition || 0 }\`
                Mentionable: ${role.mentionable ? 'Yes' : 'No' }
                Members Have \`${role.members.size}\`
            `)
            .setTimestamp());
    }
}