module.exports = {
    name: "block",
    description: "block",
    aliases: [],
    public: false,
    async execute(Main, message, args) {
    const member =  message.guild.member(message.mentions.users.filter(u=>!u.bot).first()  || message.guild.members.cache.get(args[0]))
    const reason = args[1]||"Неизвесной"
    const time = args[2]||0
    const timeT = args[2]||"Навсегда"
    Block.findOne({id: member.id},(err,Data)=> {
        if(!Data){
            let nBlock = new Block({id:member.id,reason:reason,time:time})
            nBlock.save()
        }
    message.channel.send(OKEmbed.setDescription( `${member} успешно заблокирован по причине **${reason}** на **${timeT}**! `))
})
}
}
