module.exports = (Main,member,guild) => {
  if(member.user.bot)return;
  User.deleteOne({guildID:member.guild.id, userID:member.id})
}