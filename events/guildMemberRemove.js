module.exports = (Main,member,guild) => {
  if(member.user.bot)return;
  User.deleteOne({guildID:guild.id, userID:member.id})
}