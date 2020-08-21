const Command = require('../../Structures/Command');
const Discord = require('discord.js')
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['rps'],
			category: 'economy'
		});
	}
	run(message,language,args) {
    try {
      if(parseInt(args[0])*2 > Data.money)return message.reply(this.Main.embeds.ErrEmbed.setDescription(`Вам не хватает денег`));
if((!parseInt(args[0]))||parseInt(args[0]) < 0)return message.reply(this.Main.embeds.ErrEmbed.setDescription(`Минимальная ставка 1$`))
else {
  this.Main.db.User.findOne({guildID: message.guild.id, userID: message.author.id},async(err,data) => {
    if(err)return console.log(err);
  const chooseArr = ["🗻", "🤚", "✌️"];
  const embed = new Discord.MessageEmbed()
    .setColor("#ffffff")
    .setFooter(message.guild.me.displayName, this.Main.user.displayAvatarURL())
    .setDescription("Нажмите на емодзи!")
    .setTimestamp();
    const m = await message.channel.send(embed);
    const botChoice = chooseArr[Math.floor(Math.random() * chooseArr.length)];
    const reacted =  await promptMessage(m, message.author, 30, chooseArr)||botChoice;
    let bet = parseInt(args[0]);
    if ((reacted === "🗻" && botChoice === "✌️") ||(reacted === "🤚" && botChoice === "🗻") ||(reacted === "✌️" && botChoice === "🤚")) {
      embed.setTitle('Вы выйграли')
      embed.setDescription(`Емодзи:${reacted}/${botChoice}\nВыйграли денег${bet * 2}`)
      m.edit(embed)
      data.money += bet*2
      data.save();
    }
    else if (reacted === botChoice){
      embed.setTitle('Ничья')
      embed.setDescription(`Емодзи:${reacted}/${botChoice}`)
      m.edit(embed)
    }
    else{
    embed.setTitle('Вы проиграли')
    embed.setDescription(`Емодзи:${reacted}/${botChoice}\nПроиграли денег${bet * 2}`)
    m.edit(embed)
    data.money -= bet*2
    data.save();
    async function promptMessage (message, author, time, validReactions) {
      time *= 1000;
      for (const reaction of validReactions) await message.react(reaction);
      const filter = (reaction, user) => validReactions.includes(reaction.emoji.name) && user.id === author.id;
      return message
          .awaitReactions(filter, { max: 1, time: time})
          .then(collected => collected.first() && collected.first().emoji.name);
  }
     }})}
    } catch (error) {
      console.log(error)
    }
  }
}
