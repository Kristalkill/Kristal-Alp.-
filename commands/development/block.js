const { config } = require("dotenv/types")

module.exports = {
    name: 'eval',
    description: 'eval',
    aliases: ["e"],
    public: false,
    async execute(Main, message, args) {
    let member =  message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]))
    config.block.push(member.id)
    message.channel.send(OKEmbed.setDescription(`${member} успешно заблокирован!`))
    }
}
