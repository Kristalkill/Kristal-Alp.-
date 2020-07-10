module.exports = (Main,member,guild) => {
  if(member.user.bot)return;
  Guild.findOne({guildID: member.guild.id} , (err,res) => {
  User.deleteOne({guildID:member.guild.id, userID:member.user.id})
  if (res.LChannel != undefined){
    let guildMemberRemoveEmbed = new Discord.MessageEmbed()
    .setTitle(`Привет ${member.user.name}`)
    .setDescription(`${member.user.id}`)
    .setThumbnail(member.user.avatarURL())
    Main.channels.cache.get(res.LChannel).send(guildMemberRemoveEmbed);
  }
})
}