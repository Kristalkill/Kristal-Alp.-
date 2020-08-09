////____MODULES____///
global.Discord = require('discord.js')
global.moment = require("moment");
global.typeorm = require("typeorm");
global.humanizeDuration = require('humanize-duration');
global.ms = require('ms');
global.fs = require("fs");
const express = require('express');
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
global.Giveaway = require('./models/giveaway.js');
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
app.listen(PORT,async()=>{
  try{
  console.log(`[✅Сайт] запущен на ${PORT}`);
  }catch(error){
  res.status(error.response.status)
  return res.send(error.message);
  }
  });
Main.login(process.env.Token)