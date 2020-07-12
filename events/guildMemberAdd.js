module.exports = (Main,member,guild) => {
if(member.user.bot)return;
User.create({guildID:member.guild.id, userID:member.author.id});
}