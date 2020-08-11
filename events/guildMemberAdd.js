module.exports = (Main,member,guild) => {
    try {
        if(member.user.bot)return;
        User.create({guildID:member.guild.id, userID:member.id})   
    } catch (error) {
        console.log(error)
    }
}