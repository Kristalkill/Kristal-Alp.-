module.exports = {
    name: "unmute",
    description: "unmute",
    Permission:["MANAGE_CHANNELS"],
    PermissionBOT:["MANAGE_CHANNELS","MANAGE_ROLES"],
    aliases: [],
    public: true,
    async execute(Main, message, args) {
Guild.findOne({guildID: message.guild.id},(err,res) => {
let muterole = (res.Moderation.muterole ||message.guild.roles.cache.find(x => /(В)?[Mм][uyу][t(ьт)]([eеd])?/gi.test(x.name)).id);
let member = message.guild.member(message.mentions.users.filter(u=>!u.bot).first()||message.guild.members.get(args[0]))
if(member.roles.cache.has(muterole)){
  Mute.deleteOne({guildID:message.guild.id,id:member.id});
  member.roles.remove(muterole);
  message.channel.send(OKEmbed.setDescriptiom(`${member} розмучен!`));
}
})
}
}