module.exports = {
    name: "mute",
    description: "mute",
    Permission:["MANAGE_CHANNELS"],
    PermissionBOT:["MANAGE_CHANNELS","MANAGE_ROLES"],
    aliases: [],
    public: true,
    async execute(Main, message, args) {
Guild.findOne({guildID: message.guild.id},(err,res) => {
let muterole = (res.Moderation.muterole || message.guild.roles.find(muterole => muterole.name.includes(["muted","мут"])).id);
let member = message.guild.member(message.mentions.users.filter(u=>!u.bot).first()||message.guild.members.get(args[0]))
if(!muterole){
    try{
      muterole = await message.guild.createRole({
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
if(parseInt(args[1])) return message.reply("Введите время мута!");
await(member.addRole(muterole));
message.reply(`<@${member.id}> замучен на  ${humanizeDuration(mutetime,{round: true,language: "ru"})}`);
setTimeout(function(){
  tomute.removeRole(muterole);
  message.channel.send(`<@${muterole}> has been unmuted!`);
}, ms(mutetime));
})
}
}
