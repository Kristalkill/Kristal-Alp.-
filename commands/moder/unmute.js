module.exports = {
    name: "unmute",
    description: "unmute",
    Permission:["MANAGE_CHANNELS"],
    PermissionBOT:["MANAGE_CHANNELS","MANAGE_ROLES"],
    aliases: [],
    public: true,
    async execute(Main, message, args) {
      try {
        Guild.findOne({guildID: message.guild.id},async(err,res) => {
          let muterole = (res.Moderation.muterole.id ||message.guild.roles.cache.find(x => /(В)?[Mм][uyу][t(ьт)]([eеd])?/gi.test(x.name)).id);
          let member = message.guild.member(message.mentions.users.filter(u=>u.id != message.guild.me.id).first()||message.guild.members.get(args[0]))
          if(member.roles.cache.has(muterole)){
            await Mute.deleteOne({guildID:message.guild.id,id:member.id});
            await member.roles.remove(muterole);
            message.channel.send(embeds.OKEmbed.setDescription(`${member} розмучен!`));
          }
          })
      } catch (error) {
        console.log(error)
      }}}