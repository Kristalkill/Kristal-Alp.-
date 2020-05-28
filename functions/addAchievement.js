module.exports=
async function addAchievement(param,name,Data,message) {
    if(param && Data.Achievements.includes(Achievements.name.emoji) == false ){
      Data.Achievements += `${Achievements.name.emoji}`;
      let AchievementEmed = new Discord.MessageEmbed()
      .setColor(Guild.colors)
      .setTitle(`**Поздравим** ${message.author}`)
      .setImage(`${message.author.avatarURL({dynamic: true})}`)
      .addField(`**${message.author.tag}**`,`**С новым дистижением**\n**Значок: **${Achievements.name.emoji}\n**Название: **${Achievements.name}\n**Описание: **${Achievements.name.description}`)
       message.channel.send(AchievementEmed)
}
}
