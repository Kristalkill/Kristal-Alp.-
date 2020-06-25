Achievements = require('../variables/achivments.js')
module.exports=
function addAchievement(param,number,Data,message){
  if(param && Data.Achievements.includes(number) == false ){
    Data.Achievements.push(number)
    let AchievementEmed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle(`**Поздравим** ${message.author}`)
    .setImage(`${message.author.avatarURL({dynamic: true})}`)
    .addField(`**${message.author.tag}**`,`**С новым дистижением**\n**Значок: **${Achievements[number].emoji}\n**Название: **${Achievements[number].name}\n**Описание: **${Achievements[number].description}`)
     message.channel.send(AchievementEmed)
}
}