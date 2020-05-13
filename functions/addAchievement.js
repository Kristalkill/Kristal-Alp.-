module.exports=
async function addAchievement(param,emoji,name,description,Data,message) {
    if(param && Data.Achievements.includes(emoji) == false ){
      Data.Achievements += `${emoji}`;
      let AchievementEmed = new Discord.MessageEmbed()
      .setColor(Guild.colors)
      .setTitle(`**Поздравим** @${message.author.tag} ,с новым дистижением`)
      .setImage(`${message.author.avatarURL}`)
      .addField("**Значок**",`**${emoji}**`,true)
      .addField("**Название**",`**${name}**`,true)
      .addField("**Описание**",`**${description}**`,true);
     message.channel.send(AchievementEmed)
}
}
