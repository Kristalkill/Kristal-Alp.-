const Command = require('../../Structures/Command');
const Discord = require('discord.js')
const Achievements = require('../../utilites/variables.js').Achievements;
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['profile'],
			description: 'profile',
			category: 'economy'
		});
	}
	run(message,args) {
    try {
      let reputationtext = ''
      let member =  message.guild.member(message.mentions.users.filter(u=>u.id != message.guild.me.id).first() || message.guild.members.cache.get(args[0]) || message.author)
      const statuses = {"online": "<a:online:709844735119851610>", "dnd": "<a:dnd:709844760491196576>","idle":"<a:snow:709844747145052321>","offline":"<a:offline:709844724311392296> Оффлайн"}
      const devices = {"desktop": "Компьютер", "web": "Сайт", "mobile":"Смартфон"};
      let devicesText = " ";
      if(member.user.presence.clientStatus >= 1)return member.user.presence.clientStatus.forEach(dev => {devicesText += `${devices[dev]},`});
      const flags = {
       DISCORD_EMPLOYEE: '<:Staff:709858516390641745>',
       DISCORD_PARTNER: '<:Partner:709854788463886399>',
       HYPESQUAD_EVENTS: '<:HSEvents:709854801004986428>',
       BUGHUNTER_LEVEL_1: '<:BugHunter:709854729013821452>',
       HOUSE_BRAVERY: '<:HSBravery:709854778787758111>',
       HOUSE_BRILLIANCE: '<:HSBrilliance:709858505506553976> ',
       HOUSE_BALANCE: '<:HSBalance:709854768000008202>',
       EARLY_SUPPORTER: '<:EarlySupporter:709854757702861303',
       BUGHUNTER_LEVEL_2: '<:BugHunter2:709854743199219872>',
       VERIFIED_DEVELOPER: '<:coder:709854816725106859>'
      };
       const flag = member.user.flags.toArray();
        let ftext = " ";
        if(flag.length != 0){
          for(const f of flag){ftext += `${flags[f]}`}
        };
        const activity = member.presence.activities.map(a => {
        let str = "";
        if(a.type === "CUSTOM_STATUS") {
          if(a.emoji) str += ` `;
          if(a.state) str += a.state + " ";
          return str;}
          switch (a.type) {
            case "PLAYING": str = "**Играет в** ";break;
            case "STREAMING": str = "**Стримит** ";break;
            case "LISTENING": str = "**Слушает** ";break;
            case "WATCHING": str = "**Смотрит** ";break;
          }
          if(a.name) str += `${a.name} `;
          if(a.details) str += "\n  " + a.details + " ";
          if(a.state) str += "  " + a.state + " ";
          if(a.url) str += "  " + a.url;
          return str;
        }).join("\n");
       if(member.user.bot) return  message.channel.send(`**Error: Боты не люди**`)
      this.Main.db.User.findOne({guildID: message.guild.id, userID: member.id},(err,Data) => {
  if(err) return console.log(err);
      this.Main.db.Guild.findOne({guildID: message.guild.id},(err,res) => {
  if(err) return console.log(err);
  if(Data) {
    switch (true) {
      case Data.rep <= -30 :
        reputationtext = `${Data.rep}|Сатана`
         break;
      case Data.rep >=-10 && Data.rep <= -5:
        reputationtext = `${Data.rep}|Чорт`
         break;
      case Data.rep >= -4 && Data.rep <= 0:
        reputationtext = `${Data.rep}|Лицемер`
         break;
      case Data.rep >= 0 && Data.rep <= 2:
         reputationtext = `${Data.rep}|Нейтральная`
          break;
       case Data.rep >= 3 && Data.rep <= 9:
         reputationtext = `${Data.rep}|Добрый человек`
           break;
       case Data.rep >= 10 && Data.rep <= 30:
          reputationtext = `${Data.rep}|Слуга Народа`
           break;
       case Data.rep >= 30:
          reputationtext = `${Data.rep}|Ангел`
           break;
  }
      let page = 1;
      if(member.presence.activities == null){activity = "Нету"}
      let profileembed1 = new Discord.MessageEmbed()
          .setThumbnail(member.user.displayAvatarURL({dynamic: true}))
          .setTitle(`**${member.user.username}**`)
          .setColor('RANDOM')
          .addField(`**О пользователе**`, `>>> **Статус**:  ${activity || 'Нету'}\n**Значки:  **${ftext||"Нету"}\n**Устройство:**${statuses[member.user.presence.status]} ${devicesText}\n**Акаунт создан**:  ${CreateData}\n**Присоединился**: ${this.Main.utils.formatDate(member.joinedAt)}`)
          .addField(`**Акаунт**`,`>>> **💰│Баланс**:  ${this.Main.utils.abbreviateNumber(Data.money)}$\n**🔰│Уровень**:  ${Data.level}  **XP:**  (${Data.xp}/${res.Economy.upXP*Data.level})  **Осталось:**  ${res.Economy.upXP*Data.level - Data.xp} XP \n**🚩│Варны**:  ${Data.warn}\n**:thumbsup_tone3:│Репутация:** ${reputationtext}\n**💑│Партнер**:  ${this.Main.users.cache.get(Data.partner)? this.Main.users.cache.get(Data.partner).tag :'Нету'}`, true)
        let profileembed2 = new Discord.MessageEmbed()
        .setTitle('**🏅 Достижения**')
        .setThumbnail(member.user.displayAvatarURL({dynamic: true}))
        .setColor('RANDOM')
        let profileembed3 = new Discord.MessageEmbed()
        .setTitle('**🏅 Роли**')
        .setThumbnail(member.user.displayAvatarURL({dynamic: true}))
        .setColor('RANDOM')
        let i = 1;
        member.roles.cache.size > 1 ? member.roles.cache.sort((a,b) => b.position - a.position).filter(role => role.id !== message.guild.id).forEach(role => {profileembed3.addField('** **',`${role}`)}) : profileembed3.setDescription(`**Нету**`)
        Data.Achievements >= 1 ? Data.Achievements.forEach(Achievement => {profileembed2.addField(`**${i++}.${Achievements[Achievement].name}|${Achievements[Achievement].emoji}**`,`\n**${Achievements[Achievement].description}**`)}) :  profileembed2.setDescription(`**Нету**`)
      const pages = [profileembed1,profileembed2,profileembed3]
        if(message.guild.me.hasPermission('MANAGE_MESSAGES'))return message.delete();
        message.channel.send(profileembed1.setFooter(`Страница ${page} из ${pages.length}`)).then(async msg => {
        await msg.react('⬅')
        await msg.react('⏹')
        await msg.react('➡')
        const filter = (reaction, user) => reaction.emoji.name === '⬅'||'⏹'||'➡' && user.id === message.author.id;
        const collector =  msg.createReactionCollector(filter, {timer: 6000})
       
        collector.on('collect', reaction => {
          switch(reaction.emoji.name){
            case '⬅':
              page == 1 ? page = pages.length : page--
              msg.edit(pages[page-1].setFooter(`Page ${page} of ${pages.length}`));
              break;
            case '⏹':
              msg.delete();
              break;
            case '➡':
              page == pages.length ? page = 1 : page++
              msg.edit(pages[page-1].setFooter(`Page ${page} of ${pages.length}`));
              break;
          }
          if(message.guild.me.hasPermission('MANAGE_MESSAGES'))return r.users.remove(message.author.id)
  })
  })
  }
  else return message.channel.send(this.Main.embeds.ErrEmbed.setDescription(`Данного человека нету в базе данных`))
  })
})
    } catch (error) {
      console.log(error)
    }
  }
}