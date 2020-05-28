////____MODULES____///
global.Discord = require('discord.js')
global.miss  = require('missapi');
global.moment = require("moment");
global.typeorm = require("typeorm");
global.ms = require('ms');
global.fs = require("fs");
const express = require('express');
global.mongoose = require("mongoose");
///____CONST____////
////____FUNCTIONS___///
require("dotenv").config();;
const expresser = express();
PORT = process.env.PORT || 4000
addAchievement = require('./functions/addAchievement.js')
const invites = {};
////____GLOBAL____///
global.User = require('./models/user.js');
global.Guild = require('./models/guild.js');
global.Clan = require('./models/clan.js');
global.config = require('./config.json');
global.Main = new Discord.Client();
//____MAIN____///
Main.colors = require("./color.json");
Main.commands = new Discord.Collection();
Main.aliases  = new Discord.Collection();
///____Export______///
const Achievements = {
      "Новичок": {
        name: "🔰",
        description: "Начать пользоваться ботом"
      },
      "Обезьяна": {
        name: "🐵",
        description: "Заработать первую 1.000 бананов"
      },
      "Ученик": {
        name: "📘",
        description: "Получить 5 уровень"
    }
}
expresser.listen(PORT,()=>{
console.log(`Server Running on port ${PORT}`);
});
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
  if(member.user.bot)return;
  Guild.findOne({guildID: member.guild.id} , (err,res) => {
  User.findOne({guildID:member.guild.id, userID:member.user.id}, (err,Data) => {
  if(err) return console.log(err);
  if(!Data){
    let user = new User({guildID:member.guild.id, userID:member.user.id})
    user.save()
  if (res.WLChannel != undefined){
    let guildMemberAddEmbed = new Discord.MessageEmbed()
    .setTitle(res.Wmessage.title)
    .setDescription(res.Wmessage.description)
    .setImage(member.user.avatarURL())
    Main.channels.cache.get(res.Wmessage.WChannel).send(guildMemberAddEmbed);
  }
}
})
})
})
Main.on("guildMemberRemove", async (member,guild) => {
  if(member.user.bot)return;
    Guild.findOne({guildID: member.guild.id} , (err,res) => {
  User.deleteOne({guildID:member.guild.id, userID:member.user.id})
  if (res.WLChannel != undefined){
    let guildMemberRemoveEmbed = new Discord.MessageEmbed()
    .setTitle(res.Lmessage.title)
    .setDescription(res.Lmessage.description)
    .setImage(member.user.avatarURL())
    Main.channels.cache.get(res.Lmessage.LChannel).send(guildMemberRemoveEmbed);
  }
})
})

Main.on('message', async(message) => {
    if(message.author.bot)return;
    if(message.guild.member(message.mentions.users.first()) == message.guild.me){
      let BotEmbed = new Discord.MessageEmbed()
      .setTitle(`**Префикс бота:** ${res.Moderation.prefix}`);
      message.channel.send(BotEmbed)
    }
    User.findOne({guildID: message.guild.id, userID: message.author.id},(err,Data)=> {
    Guild.findOne({guildID: message.guild.id},(err,res) => {
   if(err){console.log(err);}
   if(!Data){
      let user = new User({guildID:message.guild.id, userID:message.author.id})
        user.save()
   }
    if(!res){
        let guild = new Guild({guildID: message.guild.id,ownerID:message.guild.ownerid})
        guild.save()
      }
  if(Data&&res){
  Data.xp += res.Economy.xp
  Data.money += res.Economy.money
  Data.massages++
  addAchievement(Data.level >= 5,'📘',Data,message)
  addAchievement(Data.money >= 1000,'🐵',Data,message)
if(Data.xp >= res.Economy.upXP*Data.level){
  Data.xp -= res.Economy.upXP*Data.level;
  Data.level+=1
  let embed = new Discord.MessageEmbed()
  .setDescription(`Поздравим **${message.author.username}** с ${Data.level} уровнем!`);
  message.channel.send(embed);

}
Data.save()
  if(!message.content.startsWith(res.Moderation.prefix))return;
  const args = message.content.slice(res.Moderation.prefix.length).trim().split(/ +/g);
  const cmdName = args.shift().toLowerCase();
  const command = Main.commands.get(cmdName) || Main.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdName));
  if(!command)return;
  if(!require('./config.json').owner.includes(message.author.id) && command.public === false) return;
  command.execute(Main, message, args,res,Data,err);
}
})
})
})
Main.on('ready', async () => {
  console.log(`[✅Bot] ${Main.user.tag} Online!`)
       let statuses = [`!help`, `${Main.guilds.cache.size} серверов`, `${Main.users.cache.size} участников`, `Bot by END`];
       let acitvestatus = statuses[Math.floor(Math.random() * statuses.length)];
       setInterval(function () {
           Main.user.setPresence({ game: { name: acitvestatus, status: 'online', type: "STREAMING", url: "https://www.youtube.com/channel/UC-r7FefpKluK-rlwaWlQFOw" } });
           Main.user.setPresence({ activity: { name: acitvestatus }, status: 'online' });
       }, 15 * 1000);

});
Main.login(process.env.Token)
