////____MODULES____///
global.Discord = require('discord.js')
global.moment = require("moment");
global.typeorm = require("typeorm");
global.humanizeDuration = require('humanize-duration');
global.ms = require('ms');
global.fs = require("fs");
const express = require('express');
const message = require('./events/message.js');
global.mongoose = require("mongoose");
////____FUNCTIONS___///
require("dotenv").config();
var app = express();
PORT = process.env.PORT || 4000
addAchievement = require('./functions/addAchievement.js')
global.cooldowns  = new Map();
////____GLOBAL____///
global.User = require('./models/user.js');
global.Guild = require('./models/guild.js');
global.Block = require('./models/block.js');
global.Mute = require('./models/mute.js');
global.config = require('./config.json');
global.Main = new Discord.Client();
//____MAIN____///
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
fs.readdir('./events/', (err, files) => {
  if (err) return console.error;
  files.forEach(file => {
    if (!file.endsWith('.js')) return;
    const event = require(`./events/${file}`);
    let evtName = file.split('.')[0];
    console.log(`Загружен ивент '${evtName}'`);
    Main.on(evtName, event.bind(null, Main));
  });
});
setInterval(()=>{
  Mute.find().exec((err,res)=> {
    res.forEach(async mute => {
      const guild = Main.guilds.cache.get(mute.guildID)
      console.log(`Guild - ${guild}`)
      console.log(`mute - ${mute}`)
      if(!guild)return;
      const role = guild.role.cache.get(mute.role);
      if(!guild.members.cache.get(mute.id) && mute.time !== null && mute.time <= Date.now()) res.deleteOne({guild: mute.guildID,id:mute.id});
      if(!guild.members.cache.get(mute.id))return;
      if(!role) res.deleteOne({guild: mute.guildID,id:mute.id})
      if(mute.time === null){
        if(!guild.members.cache.get(mute.id).roles.cache.has(mute.role)) guild.memebrs.cache.get(mute.id).roles.add(mute.role)
  
      }
      else return message.channel.send(OKEmbed.setDescription(`${guild.members.cache.get(mute.id)} успешно розмучен`));
  })
  }
  )},5000)
////// HTML //////////
app.set('view engine', 'html');
app.get("/api/guilds",(req,res)=>{
res.send(String(Main.guilds.cache.size))
});
app.get("/api/users",(req,res)=>{
res.send(String(Main.users.cache.size))
});
app.get("/api/channels",(req,res)=>{
res.send(String(Main.channels.cache.size))
});
app.get("/api/cpu",(req,res)=>{
res.send(String((process.cpuUsage().user/1024/1024).toFixed(2)))
});
app.get("/api/ram",(req,res)=>{
res.send(String((process.memoryUsage().heapTotal / process.memoryUsage().heapTotal * 100).toFixed(2)))
});
app.get("/api/storage",(req,res)=>{
res.send(String((process.cpuUsage().user/1024/1024/100).toFixed(2)))
});
app.use("/index", function(request, res){
  res.sendFile('./scr/index.html', {root: __dirname})
});
app.use("/dashboard", function(request, res){
	res.sendFile('./scr/dashboard.html', {root: __dirname})
});
app.use(express.static('./scr/public'));
app.use(function(req, res, next){
  res.status(404).sendFile('./scr/404.html',{root: __dirname})
});
app.use(function(req, res, next){
  res.status(200).sendFile('./scr/404.html', {root: __dirname})
});
app.listen(PORT,()=>{
  console.log(`[✅Сайт] запущен на ${PORT}`);
  });
Main.login(process.env.Token)