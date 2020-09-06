const Event = require('../Structures/Event');
const Discord = require('discord.js');
module.exports = class extends Event {
  constructor(...args) {
		super(...args, {
			once: true
		});
	}
	async run() {
	console.log(`[✅Bot] ${this.Main.user.tag} Запущен!`)
	const GiveAway  = new Discord.MessageEmbed()
.setTitle("🎉**Giveaway** 🎉")
await this.Main.music.connect()
setInterval(()=>{
  try {
    this.Main.user.setPresence({ game: { name: `k!help`, status: 'online', type: "STREAMING", url: "https://www.youtube.com/channel/UC-r7FefpKluK-rlwaWlQFOw" } });
    this.Main.user.setPresence({ activity: { name: `k!help` }, status: 'online' });
  } catch (error) {
    console.log(error)
  }},15000); 

}
}