module.exports = {
    name: "kick",
    description: "kick",
    Permission:["KICK_MEMBERS"],
    PermissionBOT:["KICK_MEMBERS"],
    aliases: [],
    public: true,
    async execute(Main, message, args,res) {
let member =  message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author)
if(member.kickable === true){
if(!args[1]||!member)return message.reply(ErrEmbed.setDescription(`Пример использывания ${res.Moderation.prefix}kick @user/userid причина`));
let reason = args[1]
member.kick([reason])
message.channel.send(OKEmbed.setDescription(`${member.user.name} кикнут по причине **${reason}**`))
}
else{
    message.reply(ErrEmbed.setDescription("Я не могу кикнуть этого учасника"))
}
}
}