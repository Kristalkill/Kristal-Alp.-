const Event = require('../Structures/Event');
module.exports = class extends Event {
    async run(member){
    try {
        if(member.user.bot)return;
        this.Main.db.User.create({guildID:member.guild.id, userID:member.id})   
    } catch (error) {
        console.log(error)
    }
}
}