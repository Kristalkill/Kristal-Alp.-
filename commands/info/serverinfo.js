const strftime = module.require("strftime")
const vremya_po_msk = strftime.timezone(180);
module.exports = {
  name: 'serverinfo',
  description: 'Информация о сервере',
  aliases: ["sinfo","servi"],
  public: true,
  async execute(Main, message, args) {
  try {
    let memberCount = message.guild.memberCount;
    let guildID = message.guild
    let afkChannel = "Нет";
    let afkTimeout = "Нет";
    let voiceChannels = [];
    let textChannels = [];
    let categoryChannels = [];
    let members = guildID.members.filter(member => !member.user.bot).size;
    let total = memberCount;
    let bots = guildID.members.filter(member => member.user.bot).size;
    let verifLvl = guildID.verificationLevel;
    if (guildID.afkChannel !== null) {
      afkChannel = guildID.afkChannel.name;
      afkTimeout = `${Math.round(guildID.afkTimeout / 60)} minutes`;
    }
      guildID.region = guildID.region[0].toUpperCase()+guildID.region.slice(1);
      guildID.channels.forEach(channel => {
      if (channel.type === "voice") voiceChannels.push(channel);
      if (channel.type === "text") textChannels.push(channel);
      if (channel.type === "category") categoryChannels.push(channel);
      if (verifLvl === 0) verifLvl = "Нет";
      if (verifLvl === 1) verifLvl = "Низкий";
      if (verifLvl === 2) verifLvl = "Средний";
      if (verifLvl === 3) verifLvl = "Ты дурачок";
      if (verifLvl === 4) verifLvl = "Пзд нахуй блять";
    });
    const embed =
      new Discord.MessageEmbed()
        .setTitle(`**Сатистика сервера ${guildID.name}**`)
        .setAuthor(`${guildID.name}`, `${guildID.iconURL}`)
        .setColor("#a7f442")
        .setThumbnail(guildID.iconURL)
        .addField("**<:online:703442135533224136>В сети:** ", `**${guildID.members.filter(m => ["online"].includes(m.presence.status)).size}**`, true)
        .addField("**<:offline:703442135273439403>Не в сети:** ", `**${guildID.members.filter(m => m.presence.status === "offline").size}**` ,true)
        .addField("**<:idle:703442135436755065>Не активен: ** ", `**${guildID.members.filter(m => ["idle"].includes(m.presence.status)).size}**`, true)
        .addField("**<:dnd:703442135437017109>Не беспокоить:** ", `**${guildID.members.filter(m => ["dnd"].includes(m.presence.status)).size}**`, true)
        .addField("**<:emoji_ghost:703447106517729290>Эмодзи: **", `**${guildID.emojis.size}**` ,true)
        .addField("**<:owner1:703447088603594822> Основатель: **", `**${guildID.owner.user.tag}**` ,true)
        .addField("**🏳️Регион: **", `**${guildID.region}**`, true)
        .addField(`**🎖️Роли:**`, `**${guildID.roles.size}**`, true)
        .addField(`**<:members:703447344191897710>Пользователи:**`, `**${(total)} (${(bots)}, ${(members)})**`, true)
        .addField(`**⚙️Уровень верификации:**`, verifLvl, true)
        .addField(`**<:rich_presence:704281798175359026>Каналы:**`, `**${guildID.channels.size} (${(voiceChannels.length)}, ${(textChannels.length)}, ${(categoryChannels.length)})**`, true)
        .addField(`**💤AFK Канал:**`, afkChannel, true)
        .addField(`**<:slowmode:704282158407352322>AFK Тайм-аут:**`, afkTimeout, true)
        .addField("**🎤В войсах: **", `**${guildID.members.filter(m => m.voiceChannel).size}**`, true)
        .addField("**🕥Время:**", `**${vremya_po_msk('%H:%M', new Date())} по МСК**`, true)
        .setFooter(`Kristal Bot By END`);

    message.channel.send(embed);
  } catch (err) {
    console.log(err);
  }
}
}
