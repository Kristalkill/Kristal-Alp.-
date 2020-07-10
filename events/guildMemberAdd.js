module.exports = (Main,member,guild) => {
    if(member.user.bot)return;
    let user = new User({guildID:member.guild.id, userID:member.user.id})
    user.save();
    Guild.findOne({guildID: member.guild.id} , (err,res) => {
    if(err) return console.log(err);
    if (res.WChannel != undefined){
      let guildMemberRemoveEmbed = new Discord.MessageEmbed()
      .setTitle(`Привет ${member.user.name}`)
      .setDescription(`${member.user.id}`)
      .setThumbnail(member.user.avatarURL())
      Main.channels.cache.get(res.WChannel).send(guildMemberRemoveEmbed);
    }
  })
}