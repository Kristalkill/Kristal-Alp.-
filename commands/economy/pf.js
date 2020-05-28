abbreviateNumber = require('../../functions/abbreviateNumber.js')
formatDate = require('../../functions/formatDate.js')
module.exports = {
  name: 'pf',
  description: 'Просмотр своего баланса.',
  aliases: ["profile","p","balance","$"],
  public: true,
  async execute(Main, message, args,res) {
    let member =  message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author)
    const JoinedData = formatDate(member.joinedAt);
    const CreateData = formatDate(member.user.createdAt);
    let statuses = {"online": "<a:online:709844735119851610> Онлайн", "dnd": "<a:dnd:709844760491196576> Не беспокоить","idle":"<a:snow:709844747145052321> Нет на месте","offline":"<a:offline:709844724311392296>Оффлайн"}
    const devices = {"desktop": "<:monitor:709846096393928754> Компьютер", "web": "<:browser:709846119710064680> Сайт", "mobile": "<:phone:709846108712730724> Смартфон"};
    let devicesText = " ";
    if(member.user.presence.clientStatus){
    for(let dev in member.user.presence.clientStatus){
    let s = member.user.presence.clientStatus[dev]
    devicesText += `${devices[dev]}`}};
    if(member.user.presence.clientStatus > 1){

    }
    if(member.user.presence.clientStatus == null){devicesText =`<a:offline:709844724311392296> Оффлайн`};
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
     VERIFIED_DEVELOPER: '<:coder:709854816725106859>'};
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
    let clanid = Data.clanID;
    if (clanid === -1) {
        clanName = 'Нету'
    } else {
        let clan = Clan.findOne({id:Data.clanID});
        clanName = Data.claname;
    }
    if(member.presence.activities == null){activity = "Нету"}
    let profileembed = new Discord.MessageEmbed()
        .setThumbnail(member.user.displayAvatarURL({dynamic: true}))
        .setColor(Guild.colors)
        .setTitle(`**${member.user.username}**`)
        .addField(`**О пользователе**`, `>>> **Статус**:  ${activity || 'Нету'}\n**Значки:  **${ftext||"Нету"}\n**Устройство:**  ${devicesText}\n**Состояние:**  ${statuses[member.user.presence.status]}\n**Акаунт создан**:  ${CreateData}\n**Присоединился**:  ${JoinedData}`)
        .addField(`**Акаунт**`,`>>> **💰│Баланс**:  ${abbreviateNumber(Data.money)}$\n**🔰│Уровень**:  ${Data.level}  **XP:**  (${Data.xp}/${res.Economy.upXP*Data.level})  **Осталось:**  ${res.Economy.upXP*Data.level - Data.xp} XP \n**🚩│Варны**:  ${Data.warn}\n**:thumbsup_tone3:│Репутация:**  ${Data.rep}\n**⚔│Клан**:  ${clanName}\n**💑│Партнер**:  ${Main.users.cache.get(Data.partner)? Main.users.cache.get(Data.partner).tag :'Нету'}`, true)
        .addField("**Роли**",`>>> ${member.roles.cache.filter(r => r.id !== message.guild.id && res.Moderation.nonpfroles.includes(r.id) === false).sort((a,b)=>b.position-a.position).map(m => m).slice(0, 10).join(" **|** ") ||"Нету"}`)
        .addField('**🏅 Достижения**', `>>> **${Data.Achievements}**`)
        .setFooter(`Помогли с командой Допи💔#1232`)
     message.channel.send(profileembed)};
})
}
}
