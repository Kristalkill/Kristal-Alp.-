const Command = require('../../Structures/Command');
const Discord = require('discord.js');
const Achievements = require('../../utilites/variables.js').Achievements;
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['profile'],
			category: 'economy'
		});
	}
	async run(message,language,args) {
    try {
      let member =  message.guild.member(message.mentions.users.filter(u=>u.id != message.guild.me.id).first() || message.guild.members.cache.get(args[0]) || message.author)
      const statuses = {"online": "<a:online:709844735119851610>", "dnd": "<a:dnd:709844760491196576>","idle":"<a:snow:709844747145052321>","offline":"<a:offline:709844724311392296> Оффлайн"}
      const devices = {"desktop": language.pf.devices.pc, "web": language.pf.devices.web, "mobile":language.pf.devices.mobile};
      let devicesText = " ";
      Object.keys(member.user.presence.clientStatus).map(dev => devicesText += `\n${devices[dev]}`)
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
        let ftext = " ";
        let flag = member.user.flags.toArray()
        flag.length > 0 ? flag.forEach(f => {ftext += `${flags[f]}`}): ftext = language.pf.type.null;
        const activity = member.presence.activities.length > 0 ? member.presence.activities.map(a => {
        let str = "";
        if(a.type === "CUSTOM_STATUS" && a.state) return str += a.state + " "
          switch (a.type) {
            case "PLAYING": str = language.pf.type.play;
            break;
            case "STREAMING": str = language.pf.type.stream;
            break;
            case "LISTENING": str = language.pf.type.listen;
            break;
            case "WATCHING": str = language.pf.type.looks;
            break;
          }
          if(a.name) str += `${a.name} `;
          if(a.details) str += "\n  " + a.details + " ";
          if(a.state) str += "  " + a.state + " ";
          if(a.url) str += "  " + a.url;
          return str;
        }).join("\n") : language.pf.type.null;
       if(member.user.bot) return  message.channel.send(this.Main.embeds.ErrEmbed.setDescription(language.bot))
       let Data = await this.Main.db.User.findOne({guildID: message.guild.id, userID: message.author.id })
        let res = await this.Main.db.Guild.findOne({guildID: message.guild.id})
  if(Data) {
    let reputationtext = `${Data.rep}|`
    switch (true) {
      case Data.rep <= -30 :
          reputationtext += language.pf.reputation.satan
         break;
      case Data.rep >=-10 && Data.rep <= -5:
        reputationtext += language.pf.reputation.devil
         break;
      case Data.rep >= -4 && Data.rep <= 0:
        reputationtext += language.pf.reputation.hypocrite
         break;
      case Data.rep >= 0 && Data.rep <= 2:
         reputationtext = language.pf.reputation.neutral
          break;
       case Data.rep >= 3 && Data.rep <= 9:
         reputationtext = language.pf.reputation.kind
           break;
       case Data.rep >= 10 && Data.rep <= 30:
          reputationtext =  language.pf.reputation.servant 
           break;
       case Data.rep >= 30:
          reputationtext = language.pf.reputation.angel 
           break;
  }
      let page = 1;
      let profileembed1 = new Discord.MessageEmbed()
          .setThumbnail(member.user.displayAvatarURL({dynamic: true}))
          .setTitle(`**${member.user.username}**`)
          .setColor('RANDOM')
          .addField(language.pf.embed.about, language.pf.embed.about1.translate({activity:activity,ftext:ftext,statuses:statuses[member.user.presence.status],devicesText:devicesText,createdAt:this.Main.utils.formatDate(member.user.createdAt),joinedAt:this.Main.utils.formatDate(member.joinedAt)}))
          .addField(language.pf.embed.account,language.pf.embed.account1.translate({money:this.Main.utils.abbreviateNumber(Data.money),level:Data.level,xp:`${Data.xp}/${res.Economy.upXP*Data.level}`,leftxp:res.Economy.upXP*Data.level - Data.xp,warn:Data.warn,reputation:Data.rep,partner:this.Main.users.cache.get(Data.partner)? this.Main.users.cache.get(Data.partner).tag :language.pf.type.null}),true)
        let profileembed2 = new Discord.MessageEmbed()
        .setTitle(`**🏅 ${language.pf.embed.achievements}**`)
        .setThumbnail(member.user.displayAvatarURL({dynamic: true}))
        .setColor('RANDOM')
        let profileembed3 = new Discord.MessageEmbed()
        .setTitle(`**🏅 ${language.pf.embed.roles}**`)
        .setThumbnail(member.user.displayAvatarURL({dynamic: true}))
        .setColor('RANDOM')
        let i = 1;
        member.roles.cache.size > 1 ? member.roles.cache.sort((a,b) => b.position - a.position).filter(role => role.id !== message.guild.id).forEach(role => {profileembed3.addField('** **',`${role}`)}) : profileembed3.setDescription(`**Нету**`)
        Data.Achievements >= 1 ? Data.Achievements.forEach(Achievement => {profileembed2.addField(`**${i++}.${Achievements[Achievement].name}|${Achievements[Achievement].emoji}**`,`\n**${Achievements[Achievement].description}**`)}) :  profileembed2.setDescription(`**Нету**`)
        const pages = [profileembed1,profileembed2,profileembed3]
        message.channel.send(profileembed1.setFooter(language.pages.translate({page:page,pages:pages.length}))).then(async msg => {
        await msg.react('⬅')
        await msg.react('⏹')
        await msg.react('➡')
        const filter = (reaction, user) => ['⬅','⏹','➡'].includes(reaction.emoji.name) && user.id === message.author.id;
        const collector =  msg.createReactionCollector(filter, {timer: 6000})
        collector.on('collect', reaction => {
          switch(reaction.emoji.name){
            case '⬅':
              page == 1 ? page = pages.length : page--
              msg.edit(pages[page-1].setFooter(language.pages.translate({page:page,pages:pages.length})));
              break;
            case '⏹':
              msg.delete();
              break;
            case '➡':
              page == pages.length ? page = 1 : page++
              msg.edit(pages[page-1].setFooter(language.pages.translate({page:page,pages:pages.length})));
              break;
          }
          if(message.guild.me.hasPermission('MANAGE_MESSAGES'))return reaction.users.remove(message.author.id)
  })
  })
  if(message.guild.me.hasPermission('MANAGE_MESSAGES'))return message.delete();
  }
  else return message.channel.send(this.Main.embeds.ErrEmbed.setDescription(language.noData))
    } catch (error) {
      console.log(error)
    }
  }
}