ErrEmbed = require('../../embeds/ErrEmbed.js')
module.exports = {
  name: 'covid',
  description: 'covid',
  aliases: ["covid"],
  public: true,
  async execute(Main, message, args) {
    if(args[0]){
    

    }
    let covid = (await require(`node-fetch`)(`https://disease.sh/v2/all`).then(r => r.json()))
     let embed = new Discord.MessageEmbed()
    .setColor("#FF30A2")
    .addField(`За все время`,`Заболело  ${parseInt(covid.cases).toLocaleString("en-US")}\n Умерло ${parseInt(covid.deaths).toLocaleString("en-US")}\nВыздоровело ${parseInt(covid.recovered).toLocaleString("en-US")}\nСделано тестов ${parseInt(covid.tests).toLocaleString("en-US")}\nСейчас болеют ${parseInt(covid.active).toLocaleString("en-US")}\nВ критическом состоянии ${parseInt(covid.critical).toLocaleString("en-US")}`,true)
    .addField(`За сегодня`,`Заболело  ${parseInt(covid.todayCases).toLocaleString("en-US")}\n Умерло ${parseInt(covid.todayDeaths).toLocaleString("en-US")}\nВыздоровело ${parseInt(covid.todayRecovered).toLocaleString("en-US")}`,true)
    .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
    message.channel.send(embed)
    }
    }