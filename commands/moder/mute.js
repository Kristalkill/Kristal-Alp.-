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
      muterole = message.guild.roles.create({
        name: "Muted",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
      res.Moderation.muterole = muterole.id;
      res.save();
    }catch(e){
      console.log(e.stack);
    }
}
if(args[1] && ms(args[2])){
member.roles.add(muterole);
message.reply(`<@${member.id}> замучен на  ${humanizeDuration(ms(args[2]),{round: true,language: "ru"})}`);
Mute.create({guildID:message.guild.id,id:member.id,reason:args[1],time:parseInt(Date.now()) + ms(args[2]),role:muterole,channel:message.channel.id})
}
else return message.reply(`Использывание команды ${res.Moderation.prefix}mute @user/userid причина время `);
})
}
}