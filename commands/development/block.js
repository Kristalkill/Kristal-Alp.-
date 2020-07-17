module.exports = {
    name: "block",
    description: "block",
    aliases: [],
    public: false,
    async execute(Main, message, args) {
    const member =  message.guild.member(message.mentions.users.filter(u=>!u.bot).first())
    const reason = args||"неизвесной"
    Block.findOne({id: member.id},(err,Data)=> {
    if(!Data){
    Block.create({id:member.id,reason:reason})
    message.channel.send(ErrEmbed.setDescription(`${member} заблокирован по причине **${reason}**`));
    }
    else return message.channel.send(ErrEmbed.setDescription(`${member} уже заблокирован по причине ${Data.reason}`))
})
}
}