module.exports = {
    name: "slowmode",
    description: "Слов мод.",
    Permission:["MANAGE_CHANNELS"],
    PermissionBOT:["MANAGE_CHANNELS"],
    aliases: [],
    public: true,
    async execute(Main, message, args) {
        let member =  message.guild.member(message.author);
        if(!args[0]||!parseInt(args[0]))return  message.channel.send(ErrEmbed.setDescription('Веддите время'))
        if(!ms(args[0])/1000 < 21600000)return  message.channel.send(ErrEmbed.setDescription('Максимальное время слоумода 6 часов'))
        else{
            message.channel.setRateLimitPerUser(ms(args[0])/1000)
            message.channel.send(OKEmbed.setDescription(`Slowmode в ${message.channel} установлен на ${`\`${args[0]}\``}`))
        }
    }
}