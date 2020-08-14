module.exports = {
    name: "kick",
    description: "kick",
    Permission:["KICK_MEMBERS"],
    PermissionBOT:["KICK_MEMBERS"],
    aliases: [],
    public: true,
    async execute(Main, message, args,res) {
        try {
            let member =  message.guild.member(message.mentions.users.filter(u=>u.id != message.guild.me.id).first()  || message.guild.members.cache.get(args[0]))
            if(member.kickable === true){
            if(!args[1]||!member)return  message.channel.send(embeds.ErrEmbed.setDescription(`Пример использывания ${res.Moderation.prefix}kick @user/userid причина`));
            let reason = args[1]
            member.kick([reason])
            message.channel.send(embeds.OKEmbed.setDescription(`${member.user.name} кикнут по причине **${reason}**`))
            }
            else{
                 message.channel.send(embeds.ErrEmbed.setDescription("Я не могу кикнуть этого учасника"))
            }   
        } catch (error) {
            console.log(error)
        }
}
}