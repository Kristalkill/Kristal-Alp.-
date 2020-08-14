exports.abbreviateNumber = function(number,digits=2) {
  var expK = Math.floor(Math.log10(Math.abs(number)) / 3);
  var scaled = number / Math.pow(1000, expK);

  if(Math.abs(scaled.toFixed(digits))>=1000) {
    scaled /= 1000;
    expK += 1;
  }
  var SI_SYMBOLS = "apμm KМBTКQ";
  var BASE0_OFFSET = SI_SYMBOLS.indexOf(' ');
  if (expK + BASE0_OFFSET>=SI_SYMBOLS.length) { // Bound check
    expK = SI_SYMBOLS.length-1 - BASE0_OFFSET;
    scaled = number / Math.pow(1000, expK);
  }
  else if (expK + BASE0_OFFSET < 0) return 0;  // Too small

  return scaled.toFixed(digits).replace(/(\.|(\..*?))0+$/,'$2') + SI_SYMBOLS[expK+BASE0_OFFSET].trim();
};
exports.addAchievement = function(param,number,Data,message){
  if(param && Data.Achievements.includes(number) == false ){
    Data.Achievements.push(number)
    let AchievementEmed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle(`**Поздравим**`)
    .setImage(`${message.author.avatarURL({dynamic: true})}`)
    .addField(`**${message.author.tag}**`,`**С новым дистижением**\n**Значок: **${variables.Achievements[number].emoji}\n**Название: **${variables.Achievements[number].name}\n**Описание: **${variables.Achievements[number].description}`)
     message.channel.send(AchievementEmed)
}
};
exports.formatDate = function (date) {
  if (typeof date == 'number') {
    date = new Date(date * 1000);
  } else if (typeof date == 'string') {
    date = new Date(date);
  } else if (Array.isArray(date)) {
    date = new Date(date[2], date[1], date[0]);
  }
  return date.toLocaleString("ru", {day: '2-digit', month: '2-digit', year: '2-digit'});
};
exports.managePerms = function(message, needPerms, addMore = false) {
    let need = [];
    if (addMore) {
      needPerms.push("EMBED_LINKS");
      needPerms.push("ADD_REACTIONS");
      needPerms.push("USE_EXTERNAL_EMOJIS");
    }
    needPerms.map((p) => !message.channel.permissionsFor(addMore ? message.guild.me : message.member).has(p) ? need.push(p) : null);
    if (need.length) return {
      need,
      embed: message.channel.permissionsFor(message.guild.me).has("EMBED_LINKS") ? true : false
    };
    else return false;
};
exports.randomize = function(min, max) {
    return Math.floor(Math.random() * (max-min) + min)
};
exports.toNum = function(text) {
  return parseInt(text.replace(/[^\d]/g, ""));
};
exports.translate = String.prototype.translate = function(vars){
    var str = this;
    for (const [KEY, value] of Object.entries(vars)) {
      str = str.replace(new RegExp(`%${KEY}%`, 'g'), value);
    }
    return str;
  }
  exports.chunk = String.prototype.chunk = function(length) {
    return this.match(new RegExp('[\\s\\S]{1,' + +length + '}', 'g'));
  }