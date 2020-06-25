formatDate = require('../../functions/formatDate.js')
module.exports = {
  name: 'pf',
  description: 'Просмотр своего баланса.',
  aliases: ["profile"],
  public: true,
  async execute(Main, message, args,res) {
    let reputationtext = ''
    let memberp = message.guild.me.hasPermission('MANAGE_MESSAGES')
    let member =  message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author)
    const JoinedData = formatDate(member.joinedAt);
    const CreateData = formatDate(member.user.createdAt);
    const statuses = {"online": "<a:online:709844735119851610>", "dnd": "<a:dnd:709844760491196576>","idle":"<a:snow:709844747145052321>","offline":"<a:offline:709844724311392296> Оффлайн"}
    const devices = {"desktop": "<:monitor:709846096393928754> Компьютер", "web": "<:browser:709846119710064680> Сайт", "mobile": "<:phone:709846108712730724> Смартфон"};
    let devicesText = " ";
    if(member.user.presence.clientStatus){
    for(let dev in member.user.presence.clientStatus){

    let s = member.user.presence.clientStatus[dev]
    devicesText += `${devices[dev]}`
  }
};
    if(member.user.presence.clientStatus > 1){
      for(let dev in member.user.presence.clientStatus){

        let s = member.user.presence.clientStatus[dev]
        devicesText += `${devices[dev]},`
      }
      };
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
for(const f of flag){ftext += `${flags[f]}`}};
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
case "WATCHING": str = "**Смотрит** ";break;}

if(a.name) str += `${a.name} `;
if(a.details) str += "\n  " + a.details + " ";
if(a.state) str += "  " + a.state + " ";
if(a.url) str += "  " + a.url;
return str;}).join("\n");
     if(member.user.bot) return message.reply(`**Error: Боты не люди**`)
    User.findOne({guildID: message.guild.id, userID: member.id},(err,Data) => {
if(err){
  console.log(err)
}
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
    let clan = Clan.findOne({id:Data.clanID});
        clanName = Data.claname;
    let page = 1;
    if(member.presence.activities == null){activity = "Нету"}
    let profileembed1 = new Discord.MessageEmbed()
        .setThumbnail(member.user.displayAvatarURL({dynamic: true}))
        .setColor(Guild.colors)
        .setTitle(`**${member.user.username}**`)
        .addField(`**О пользователе**`, `>>> **Статус**:  ${activity || 'Нету'}\n**Значки:  **${ftext||"Нету"}\n**Устройство:**${statuses[member.user.presence.status]} ${devicesText}\n**Акаунт создан**:  ${CreateData}\n**Присоединился**:  ${JoinedData}`)
        .addField(`**Акаунт**`,`>>> **💰│Баланс**:  ${abbreviateNumber(Data.money)}$\n**🔰│Уровень**:  ${Data.level}  **XP:**  (${Data.xp}/${res.Economy.upXP*Data.level})  **Осталось:**  ${res.Economy.upXP*Data.level - Data.xp} XP \n**🚩│Варны**:  ${Data.warn}\n**:thumbsup_tone3:│Репутация:** ${reputationtext}\n**⚔│Клан**:  ${clanName||'Нету'}\n**💑│Партнер**:  ${Main.users.cache.get(Data.partner)? Main.users.cache.get(Data.partner).tag :'Нету'}`, true)
        .setFooter(`Страница 1 из 3`);
      let profileembed2 = new Discord.MessageEmbed()
      .setTitle('**🏅 Достижения**')
      .setThumbnail(member.user.displayAvatarURL({dynamic: true}))
      .setColor('RANDOM')
      .setFooter(`Страница 2 из 3`);
      let profileembed3 = new Discord.MessageEmbed()
      .setTitle('**🏅 Роли**')
      .setDescription(`${member.roles.cache.map(m => m).slice(0, 90).join(" **|** ") ||"Нету"}`)
      .setThumbnail(member.user.displayAvatarURL({dynamic: true}))
      .setColor('RANDOM')
      .setFooter(`Страница 3 из 3`);
      for (let i = 0; i < Data.Achievements.length; i++) {
        let getted = Achievements[(Data.Achievements)[i]]
        profileembed2.addField(`**${i + 1}.${getted.name}|${getted.emoji}**`,`\n**${getted.description}**`)
    }
    const pages = [profileembed1,profileembed2,profileembed3]
    if(memberp){
     message.delete();
    }
      message.channel.send(profileembed1).then(msg => {
      msg.react('⬅').then( r => {
      msg.react('⏹').then( r => {
      msg.react('➡')
      const backwardF = (reaction, user) => reaction.emoji.name === '⬅' && user.id === message.author.id;
      const stopF = (reaction, user) => reaction.emoji.name === '⏹' && user.id === message.author.id;
      const forwardF = (reaction, user) => reaction.emoji.name === '➡' && user.id === message.author.id;
      const backward = msg.createReactionCollector(backwardF, {timer: 6000});
      const stop = msg.createReactionCollector(stopF, {timer: 6000});
      const forward = msg.createReactionCollector(forwardF, {timer: 6000});
      backward.on('collect', r => {
        if (page == 1) {
          page = pages.length
          msg.edit(pages[page-1].setFooter(`Страница ${page} из ${pages.length}`));
          if(memberp){
           r.users.remove(message.author.id)
         }
        }
        else{
          page--;
          msg.edit(pages[page-1].setFooter(`Страница ${page} из ${pages.length}`));
         if(memberp){
          r.users.remove(message.author.id)
        }
      }
        })
      forward.on('collect', r => {
        if (page == pages.length) {
          page = 1
          msg.edit(pages[page-1].setFooter(`Страница ${page} из ${pages.length}`));
          if(memberp){
           r.users.remove(message.author.id)
         }
        }
        else{
          page++;
          msg.edit(pages[page-1].setFooter(`Страница ${page} из ${pages.length}`));
         if(memberp){
          r.users.remove(message.author.id)
        }
      }
        })
        stop.on('collect', r => {
        msg.delete();
      })
})
})
})
  }
  else{
    let embed = new Discord.MessageEmbed()
    .setTitle("Чела нету в бд")
  }
})
  }
}