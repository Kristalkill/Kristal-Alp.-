
////____MODULES____///
global.Discord = require('Discord.js');
const miss  = require('missapi');
const moment = require("moment");
const typeorm = require("typeorm");
const fs = require("fs");
global.mongoose = require("mongoose");

///____CONST____////
const Main = new Discord.Client({ disableEveryone: true });
const command = new Discord.Collection()
const aliases = new Discord.Collection();
////____GLOBAL____///
global.Main = Main;
global.user = require('./models/user.js')
global.guild = require('./models/guild.js')
global.clan = require('./models/clan.js')
global.config = require('./config.json')
global.Owner = guild.ownerID;
///____ENV____///
process.env.Token;
process.env.youtubeToken;
//____MAIN____///
Main.colors = require("./color.json");
Main.clan = clan;
Main.guild = guild;
Main.user = user;
///____Export______///
mongoose.connect(config.dataURL,{ useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected',()=>{
  console.log('[✅DataBase] Connected!')
})
async (bot, mssage, args) => {
Main.guild.findOne({guildID:message.guild.id}, (err,res) => {
    if(err) return message.channel.send(`[❌DataBase] Произошла ошибка при добавлении сервера в базу-данных`)
    if(!res){
      let guild = new Guild({guildID: message.guild.id})
      message.channel.send(`\`[✅DataBase]\` **${message.guild.name}** Успешно была добавлена в базу-данных`)
      guild.save().catch(err => message.channel.send(`\`[❌DataBase]\` Произошла ошибка при сохранении сервера в базу-данных. Ошибка: \`\`\`${err}\`\`\``));
}
})
};
exports.randomize = function(min,max){
 return Math.floor(Math.random()*(man-min)+ min);
 };
 Main.on('message', async(message) => {
   if(message.author.bot) return;
     user.findOne({guildID: message.guild.id, userID: message.author.id}, (err,res) => {
     if(err) return message.channel.send(`\`[❌DataBase]\` Произошла ошибка при добавлении пользователя в базу-данных`)
     if(!res){
       let user = new User({guildID: message.guild.id, userID: message.author.id})
       message.channel.send(`\`[✅DataBase]\` **${message.author.username}** Успешно был(а) добавлен в базу-данных`)
       user.save().catch(err => message.channel.send(`\`[❌DataBase]\` Произошла ошибка при сохранении данных в базу-данных. Ошибка: \`\`\`${err}\`\`\``));
     }else{
    Data.user.xp += randomaze(guild.RandomizeMinXp,guild.RandomizeMaxXp);
    Data.user.money += randomaze(guild.RandomizeMinMoney,guild.RandomizeMaxMoney);
    Data.user.massages++
    Data.save()
    if(User.xp > (Guild.upXp*Data.user.level)){
     let embed = new Discord.MessageEmbed()
      .setColor(color)
      .setTitle('Ура!')
      .setDescription(`[:tada:] Поздравим **${message.author.username}** с ${Data.user.level} уровнем!`)
      message.channel.send(embed)
      Data.user.xp -= (Data.upXp*Data.user.level);
      Data.user.level+=1
      Data.save()
 }
}
})
});

fs.readdirSync('./commands').forEach(module => {
    const commandFiles = fs.readdirSync(`./commands/${module}/`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {

        const command = require(`./commands/${module}/${file}`);
        console.log(`Загружено ${commandFiles.length} комманд`);
          if (!command.help.description) {
            command.help.description == "Нету,напишите /report об этом";
          }
          if (!command.help.category) {
            command.help.category == module;
          }
          if (!command.help.owneronly) {
            command.help.owneronly == false;
          }
          command.help.aliases.forEach(alias => {
            if (!command.help.name) return console.log(`в файле ${f} нет help.name`);
            aliases.set(alias, command.help.name);
          })
        }
    });
    Main.login(config.Token).catch(err => {
      if (err.message.toLowerCase().includes("incorrect login"))
        console.log(
          `\nОшибка: Токен бота указан не правильно!\n\nУкажите корректный токен вашего бота в файле .env\nТокен не должен содержать пробелов после '='\nПример: TOKEN =abc43389u34fjfakdsfj4fj`
        );
    });
