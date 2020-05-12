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
////____GLOBAL____///
global.User = require('./models/user.js');
global.Guild = require('./models/guild.js');
global.Clan = require('./models/clan.js');
global.config = require('./config.json');
///____ENV____///
process.env.Token;
process.env.youtubeToken;
//____MAIN____///
global.Main = new Discord.Client();
Main.colors = require("./color.json");
Main.clan = Clan;
Main.guild = Guild;
Main.user = User;
Main.commands = new Discord.Collection();
Main.aliases  = new Discord.Collection();
///____Export______///
const Achivments =
{
      ":beginner:": {
        name: "Новичок",
        description: "Начать пользоваться ботом"
      },
      ":monkey_face:": {
        name: "Обезьяна",
        description: "Заработать первую 1.000 бананов"
      },
};
async function addAchivment(condition, Achivment, User, message) {
  if (condition && User.achivment.includes(Achivment) == false)return;{
    User.achivment.push(Achivment);
    message.channel.send(
      new Discord.RichEmbed()
        .setColor("RANDOM")
        .addField(
          `${message.author.tag} Достижение разблокировано!`,
          ` ** __${Achivment} ${Achivments[Achivment].name}__ ${Achivments[Achivment].description} ** `
        )
    );
  }
}
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

Main.on('ready', () => {
  console.log(`[✅Bot] ${Main.user.tag} Online!`)
})
Main.on('message', async(message) => {
  if(message.author.bot) return;
  if(message.channel.type == 'dm') return;
    User.findOne({guildID: message.guild.id, userID: message.author.id}, (err,Data) => {
    if(err) return message.channel.send(`\`[❌DataBase]\` Произошла ошибка при добавлении пользователя в базу-данных`)
    if(!Data){
      let user = new User({guildID: message.guild.id, userID: message.author.id})
      message.channel.send(`\`[✅DataBase]\` **${message.author.username}** Успешно был(а) добавлен в базу-данных`)
      user.save().catch(err => message.channel.send(`\`[❌DataBase]\` Произошла ошибка при сохранении данных в базу-данных. Ошибка: \`\`\`${err}\`\`\``));
    }
    if(Data){
    addAchivment(User.money >= 100000, ":monkey_face:", User, message);
    addAchivment(User.level >= 1, ":beginner:", User, message);
    Data.xp += randomize(1,4);
    Data.money += randomize(1,4);
    Data.massages++
    Data.save()
    Data.save
    if(User.xp > (Guild.upXp*User.level)){
   let embed = new Discord.MessageEmbed()
    .setColor(color)
    .setTitle('Ура!')
    .setDescription(`[:tada:] Поздравим **${message.author.username}** с ${Data.User.level} уровнем!`)
    message.channel.send(embed)
    Data.xp -= (Guild.upXp*User.level);
    Data.level+=1
    Data.save();
      }
      if(Data.warn >= Guild.MaxWarn){
        if(message.member.kickable == false){
           message.reply(`**${message.author.tag}**, у вас было максимальное количество предупреждений, так как у меня нету прав, я не могу вас кикнуть.  Предупреждения были обнулены.`)
           Data.warn = 0;
          Data.save()
        }else{
        let embed = new Discord.MessageEmbed()
        .setColor(config.color)
        .setDescription(`[:tada:] ${message.author.tag} был кикнут за частое нарушение. Предупреждений: \`${Data.warn}/${Guild.MaxWarn}\``)
        message.member.kick(`Частое нарушение...`)
        message.channel.send(embed)
        Data.warn = 0;
        Data.save()
        }
      }
    }
  };
  Guild.findOne({guildID: message.guild.id}, (err,Data) => {
    if(err) return message.channel.send(`[❌DataBase] Произошла ошибка при добавлении сервера в базу-данных`)
    if(!Data){
      let guild = new Guild({guildID: message.guild.id})
      message.channel.send(`\`[✅DataBase]\` **${message.guild.name}** Успешно была добавлена в базу-данных`)
      guild.save().catch(err => message.channel.send(`\`[❌DataBase]\` Произошла ошибка при сохранении сервера в базу-данных. Ошибка: \`\`\`${err}\`\`\``));
    }else{
      if (!message.content.startsWith(Data.prefix)) return;
      const args = message.content.slice(Data.prefix.length).trim().split(/ +/g);
      const cmdName = args.shift().toLowerCase();
      const command = Main.commands.get(cmdName) || Main.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdName));
      if(!command)return;
      if(!require('./config.json').owner.includes(message.author.id) && command.public === false) return;
      command.execute(Main, message, args);
    }
  })
})
Main.on("ready",()=>{
console.log(Main.commands)
})
Main.on('ready', async () => {
       console.log(`${Main.user.username} Готов к работе!`)
       let statuses = [`!help`, `${Main.guilds.size} серверов`, `${Main.users.size} участников`, `Bot by END`];
       let acitvestatus = statuses[Math.floor(Math.random() * statuses.length)]
       setInterval(function () {
           Main.user.setPresence({ game: { name: acitvestatus, status: 'online', type: "STREAMING", url: "https://www.youtube.com/channel/UC-r7FefpKluK-rlwaWlQFOw" } });
           Main.user.setPresence({ activity: { name: acitvestatus }, status: 'online' });
       }, 15 * 1000);

});
Main.login(config.Token).catch(err => {
  if (err.message.toLowerCase().includes("incorrect login"))
    console.log(
      `\nОшибка: Токен бота указан не правильно!\n\nУкажите корректный токен вашего бота в файле .env\nТокен не должен содержать пробелов после '='\nПример: TOKEN =abc43389u34fjfakdsfj4fj`
    );
});
