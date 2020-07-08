const ErrEmbed = require("../../embeds/ErrEmbed");

module.exports = {
    name: "ban",
    description: "ban",
    Permission:["BAN_MEMBERS"],
    PermissionBOT:["BAN_MEMBERS"],
    aliases: [],
    public: true,
    async execute(Main, message, args,res) {
let member =  message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author)
if(member.bannable === true){
if(!args[1]||!args[2]||!member)return message.reply(ErrEmbed.setDescription(`Пример использывания ${res.Moderation.prefix}ban @user/userid дней причина`));
let days = parseInt(args[1])
let reason = args[2]
member.ban({ days: days, reason: reason })
message.channel.send(OKEmbed.setDescription(`${member.user.name} забанен на **${days}** день по причине **${reason}**`))
}
else{
    message.reply(ErrEmbed.setDescription("Я не могу забанить этого учасника"))
}
}
}