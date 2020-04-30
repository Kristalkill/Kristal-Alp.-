
////____MODULES____///
global.Discord = require('Discord.js');
const miss  = require('missapi');
const moment = require("moment");
const typeorm = require("typeorm");
const fs = require("fs");
global.mongoose = require("mongoose");

///____CONST____////
const Main = new Discord.Client({ disableEveryone: true });
const command = new Discord.Collection();
const aliases = new Discord.Collection();
const randomize = function(min, max) {
    return Math.floor(Math.random() * (max-min) + min)
};
////____GLOBAL____///
global.Main = Main;
global.User = require('./models/user.js');
global.Guild = require('./models/guild.js');
global.Clan = require('./models/clan.js');
global.config = require('./config.json');
global.Owner = Guild.ownerID;
///____ENV____///
process.env.Token;
process.env.youtubeToken;
//____MAIN____///
Main.colors = require("./color.json");
Main.clan = Clan;
Main.guild = Guild;
Main.user = User;
Main.commands = command;
Main.aliases = aliases;
///____Export______///
mongoose.connect(config.dataURL,{ useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected',()=>{
  console.log('[✅DataBase] Connected!')
});
Main.sendHelp = function (cmd, message) {
    Main.commands.get('help').run(Main, message, [cmd])
}
fs.readdir("./commands/", (err, files) => {
  if (err) bot.logsErr();

  let jsfiles = files.filter(f => f.split(".").pop() === "js");
  console.log(`Загружено ${jsfiles.length} комманд`);

  jsfiles.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    Main.commands.set(props.help.name, props);
    if (!props.help.description) {
      props.help.description = "Это секрет даже для разработчика";
    }
    if (!props.help.category) {
      props.help.category = "Не сортированая команда";
    }
    if (!props.help.owneronly) {
      props.help.owneronly = false;
    }
    props.help.aliases.forEach(alias => {
      if (!props.help.name) return console.log(`в файле ${f} нет help.name`);
      Main.aliases.set(alias, props.help.name);
    });
  });
});
Main.on('message', async(message) => {
  if (!message.content.startsWith(Guild.prefix)) return;
      const args = message.content.slice(Guild.prefix.length).trim().split(/ +/g);
      const cmds = args.shift().toLowerCase();
      const props = bot.commands.get(cmdName) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmd));
      if(!require('./config.json').owner.includes(message.author.id) && command.public === false) return;
      command.execute(bot, message, args);
});
Main.on('message', async(message) => {
     Guild.findOne({guildID:message.guild.id}, (err,Data) => {
    if(err) return message.channel.send(`[❌DataBase] Произошла ошибка при добавлении сервера в базу-данных`)
    if(!Data){
      let guild = new Guild({guildID:message.guild.id})
      message.channel.send(`\`[✅DataBase]\` **${message.guild.name}** Успешно была добавлена в базу-данных`)
      guild.save().catch(err => message.channel.send(`\`[❌DataBase]\` Произошла ошибка при сохранении сервера в базу-данных. Ошибка: \`\`\`${err}\`\`\``));
}
})
});
 Main.on('message', async(message) => {
   if(message.author.bot) return;
    User.findOne({guildID: message.guild.id, userID: message.author.id}, (err,Data) => {
     if(err) return message.channel.send(`\`[❌DataBase]\` Произошла ошибка при добавлении пользователя в базу-данных`)
     if(!Data){
       let user = new User({guildID: message.guild.id, userID: message.author.id})
       message.channel.send(`\`[✅DataBase]\` **${message.author.username}** Успешно был(а) добавлен в базу-данных`)
       user.save().catch(err => message.channel.send(`\`[❌DataBase]\` Произошла ошибка при сохранении данных в базу-данных. Ошибка: \`\`\`${err}\`\`\``));
     }else{
    Data.xp += randomize(1,3);
    Data.money += randomize(1,3);
    Data.massages++
    Data.save()
    if(User.xp > (Guild.upXp*User.level)){
     let embed = new Discord.MessageEmbed()
      .setColor(color)
      .setTitle('Ура!')
      .setDescription(`[:tada:] Поздравим **${message.author.username}** с ${Data.User.level} уровнем!`)
      message.channel.send(embed)
      Data.xp -= (Guild.upXp*User.level);
      Data.level+=1
      Data.save()
 }
}
})
});
    Main.login(config.Token).catch(err => {
      if (err.message.toLowerCase().includes("incorrect login"))
        console.log(
          `\nОшибка: Токен бота указан не правильно!\n\nУкажите корректный токен вашего бота в файле .env\nТокен не должен содержать пробелов после '='\nПример: TOKEN =abc43389u34fjfakdsfj4fj`
        );
    });
