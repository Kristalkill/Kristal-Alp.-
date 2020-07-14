module.exports = {
    name: "mute",
    description: "mute",
    Permission:["MANAGE_CHANNELS"],
    PermissionBOT:["MANAGE_CHANNELS","MANAGE_ROLES"],
    aliases: [],
    public: true,
    async execute(Main, message, args) {
Guild.findOne({guildID: message.guild.id},(err,res) => {
let muterole = (res.Moderation.muterole ||message.guild.roles.cache.find(x => /(В)?[Mм][uyу][t(ьт)]([eеd])?/gi.test(x.name)).id);
let member = message.guild.member(message.mentions.users.filter(u=>!u.bot).first()||message.guild.members.get(args[0]))
if(!muterole){
    try{
      muterole = message.guild.createRole({
        name: "muted",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
      res.Moderation.muterole = muterole;
      res.save();
    }catch(e){
      console.log(e.stack);
    }
}
if(!args[1]) return message.reply("Введите время мута!");
member.role.add(muterole);
message.reply(`<@${member.id}> замучен на  ${humanizeDuration(mutetime,{round: true,language: "ru"})}`);
setTimeout(function(){
  member.role.remove(muterole);
  message.channel.send(`<@${member}> розмучен!`);
}, ms(mutetime));
})
}
}
