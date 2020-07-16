module.exports = {
    name: "mute",
    description: "mute",
    Permission:["MANAGE_CHANNELS"],
    PermissionBOT:["MANAGE_CHANNELS","MANAGE_ROLES"],
    aliases: [],
    public: true,
    async execute(Main, message, args) {
Guild.findOne({guildID: message.guild.id},(err,res) => {
let member = message.guild.member(message.mentions.users.filter(u=>!u.bot).first()||message.guild.members.get(args[0]))
const findMrole = message.guild.roles.cache.find(x => /(В)?[Mм][uyу][t(ьт)]([eеd])?/gi.test(x.name)) 
if(!res.Moderation.muterole){
  if(findMrole){
    res.Moderation.muterole = findMrole.id;
    res.save();
  }
else{
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
if(args[1] && parseInt(args[2])){
(async function(){
await member.roles.add(res.Moderation.muterole);
})
message.reply(`${member} замучен на  ${humanizeDuration(ms(args[2]),{round: true,language: "ru"})}`);
Mute.create({guildID:message.guild.id,id:member.id,reason:args[1],time:parseInt(Date.now()) + ms(args[2]),channel:message.channel.id})
}
else return message.reply(`Использывание команды ${res.Moderation.prefix}mute @user/userid причина время `);
}
})
}
}