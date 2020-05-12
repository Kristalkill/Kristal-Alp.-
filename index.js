////____MODULES____///
global.Discord = require('discord.js')
global.miss  = require('missapi');
global.moment = require("moment");
global.typeorm = require("typeorm");
global.ms = require('ms')
global.fs = require("fs");
global.dotenv = require('dotenv');
global.mongoose = require("mongoose");
///____CONST____////
const randomize = function(min, max) {
    return Math.floor(Math.random() * (max-min) + min)
};
////____FUNCTIONS___///
addAchievement = require('./functions/addAchievement.js')
////____GLOBAL____///
global.User = require('./models/user.js');
global.Guild = require('./models/guild.js');
global.Clan = require('./models/clan.js');
global.config = require('./config.json');
global.owners = ["359678229096955904"];
////__PROMISE__//
User.__defineGetter__("promise", function(){
  return {
  findOne : (obj) => new Promise((res,rej)=>{
    this.findOne(obj,(err,data)=>{
     if(err) rej(err)
     res(Data)
    })
  })
  }
})
Guild.__defineGetter__("promise", function(){
  return {
  findOne : (obj) => new Promise((res,rej)=>{
    this.findOne(obj,(err,Data1)=>{
     if(err) rej(err)
     res(Data1)
    })
  })
  }
})

//____MAIN____///
global.Main = new Discord.Client();
Main.colors = require("./color.json");
Main.commands = new Discord.Collection();
Main.aliases  = new Discord.Collection();
///____Export______///
mongoose.connect(config.dataURL, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected',()=>{
  console.log('[✅DataBase] Connected!')
})
fs.readdirSync('./commands').forEach(module => {
    const commandFiles = fs.readdirSync(`./commands/${module}/`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${module}/${file}`);
        command.category = module;
        Main.commands.set(command.name, command);
    }
})
Main.on("guildMemberAdd", async (member,guild) => {
  User.findOne({guildID:member.guild.id, userID:member.user.id}, (err,Data) => {
  if(err) return console.log(err);
  if(!Data){
    let user = new User({guildID:member.guild.id, userID:member.user.id})
    user.save()
  if (Guild.WLChannel != undefined){
    let guildMemberAddEmbed = new Discord.MessageEmbed()
    .setTitle(Guild.Wmessage.title)
    .setDescription(Guild.Wmessage.description)
    .setImage(member.user.avatarURL())
    Main.channels.cache.get(Guild.Wmessage.WChannel).send(guildMemberAddEmbed);
  }
}
})
})
Main.on("guildMemberRemove", async (member,guild) => {
  User.deleteOne({guildID:member.guild.id, userID:member.user.id})
  if (Guild.WLChannel != undefined){
    let guildMemberRemoveEmbed = new Discord.MessageEmbed()
    .setTitle(Guild.Lmessage.title)
    .setDescription(Guild.Lmessage.description)
    .setImage(member.user.avatarURL())
    Main.channels.cache.get(Guild.Lmessage.LChannel).send(guildMemberRemoveEmbed);
  }
})
Main.on('message', async(message) => {
  if(message.author.bot || message.channel.type == 'cmdchannel') return;
    User.findOne({guildID: message.guild.id, userID: message.author.id},(err,Data)=> {
    Guild.findOne({guildID: message.guild.id} , (err1,Data1) => {
    if(!Data){
        let user = new User({guildID:message.guild.id, userID:message.author.id})
        user.save()
      }
    if(Data){
    addAchievement(Data.level >= 5,'📘',"Новачок","5 лвл",Data,message);
    addAchievement(Data.money >= 1000,'🐵',"Бизнес","1000 бабла",Data,message);
    Data.xp += Data1.Economy.xp;
    Data.money += Data1.Economy.money;
    Data.massages++
    Data.save()
    if(User.xp > (Data1.Economy.upXp*User.level)){
     let embed = new Discord.MessageEmbed()
    .setColor(color)
    .setTitle('Ура!')
    .setDescription(`[:tada:] Поздравим **${message.author.username}** с ${Data.level} уровнем!`)
    message.channel.send(embed)
    Data.xp -= (Data1.Economy.upXp*User.level);
    Data.level+=1
    Data.save();
      }
      if(Data1.Moderation.muteRole = undefined)return;
      if(Data.warn >= Data1.Moderation.Warns.muteWarns){
        message.member.addRole(Data1.Moderation.muteRole);
        Data._muteTime = Date.now() + 60000*20
        Data.save();
        let embed = new Discord.MessageEmbed()
        .setColor(config.color)
        .setDescription(`${message.author.tag} был замучен за частое нарушение.`)
        message.channel.send(embed)
        setTimeout(function(){
         removeRole(Data.userid);
         message.channel.send(`<@${tomute.id}> has been unmuted!`);
       }, ms(mutetime));
        }
      }
      if(err1) return message.channel.send(`[❌DataBase] Произошла ошибка при добавлении сервера в базу-данных`)
      if(!Data1){
        let guild = new Guild({guildID: message.guild.id,ownerID:message.guild.ownerid})
        message.channel.send(`\`[✅DataBase]\` **${message.guild.name}** Успешно была добавлена в базу-данных`)
        guild.save().catch(err => message.channel.send(`\`[❌DataBase]\` Произошла ошибка при сохранении сервера в базу-данных. Ошибка: \`\`\`${err}\`\`\``));
      }
       if(Data1){
         if (!message.content.startsWith(Data1.Moderation.prefix)) return;
         const args = message.content.slice(Data1.Moderation.prefix.length).trim().split(/ +/g);
         const cmdName = args.shift().toLowerCase();
         const command = Main.commands.get(cmdName) || Main.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdName));
         if(!command)return;
         if(!require('./config.json').owner.includes(message.author.id) && command.public === false) return;
         command.execute(Main, message, args);
       }
})})})

Main.on('ready', async () => {
  console.log(`[✅Bot] ${Main.user.tag} Online!`)
       let statuses = [`!help`, `${Main.guilds.cache.size} серверов`, `${Main.users.cache.size} участников`, `Bot by END`];
       let acitvestatus = statuses[Math.floor(Math.random() * statuses.length)]
       setInterval(function () {
           Main.user.setPresence({ game: { name: acitvestatus, status: 'online', type: "STREAMING", url: "https://www.youtube.com/channel/UC-r7FefpKluK-rlwaWlQFOw" } });
           Main.user.setPresence({ activity: { name: acitvestatus }, status: 'online' });
       }, 15 * 1000);

});
Main.login(config.Token)
