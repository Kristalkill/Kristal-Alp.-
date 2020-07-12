module.exports = (Main,member,guild) => {
if(member.user.bot)return;
User.create({guildID:guild.id, userID:member.user.id});
}