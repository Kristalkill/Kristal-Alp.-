const Event = require('../Structures/Event');
module.exports = class extends Event {
  async run(member,guild){
  try {
    if(member.user.bot)return;
    this.Main.db.User.deleteOne({guildID:member.guild.id, userID:member.id}) 
  } catch (error) {
    console.log(error)
  }
}
}