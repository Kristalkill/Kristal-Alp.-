let Constants = require('discord.js/src/util/Constants.js')
Constants.DefaultOptions.ws.properties.$browser = 'Discord iOS'
global.user = require('./models/user.js');
global.owners = ["359678229096955904"]; //Овнеры бота
const Discord = require("discord.js");
const bot = new Discord.Client({ disableEveryone: true });
const typeorm = require("typeorm");
const fs = require("fs");
const moment = require("moment");
const config = require("./config.json"); //Настройки
const OFFGUILD = "https://discord.gg/cSwHW5M";
bot.OFFGUILD = OFFGUILD;
require("dotenv").config();
let bans = require("./bans.json"),
    mutes = require("./mutes.json"),
  voiceMutes = require("./voicemutes.json");
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.colors = require("./colors.json");
bot.bans = bans;
bot.mutes = mutes;
bot.voiceMutes = voiceMutes;
bot.clanPrice = clanPrice;
bot.bonus = bonus;
bot.bonusInterval = bonusInterval;
bot.servers = [];
global.bot = bot;
bot.isNum = function isNumeric(n) {
  // Проверяет на число
  return !isNaN(parseFloat(n)) && isFinite(n);
};
bot.locale = function locale(num) {
  // Разделяет число | Пример: 4001294 => 4.001.294
  return parseInt(num)
    .toLocaleString()
    .replace(/,/g, ".");
};
bot.sendErrEmbed = function sendErrEmbed(
  embed,
  text,
  forcesend = false,
  message = null
) {
  // Выводит ошибку с текстом
  embed.setColor("FF305A");
  embed.setTitle(`${text}`);
  embed.setDescription("Получить синтаксис `!help` `команда`");
  if (forcesend && message) {
    message.channel.send(embed);
  }
};
bot.toNum = function toNum(text) {
  // Получает число из строки | Пример: dj82f1 => 821
  return parseInt(text.replace(/[^\d]/g, ""));
};
bot.logsErr = function logsErr(err) {
  // Действия при ошибке
  console.log(err);
};
bot.sendHelp = function(cmd, message) {
  bot.commands.get("help").run(bot, message, [cmd]);
};
bot.play = async function(ytdl, message) {
  bot.servers[
    message.guild.id
  ].dispatcher = await message.guild.voiceConnection
    .playStream(
      ytdl(
        `https://www.youtube.com/watch?v=${bot.servers[message.guild.id].queue[0].url}}`
      ),
      { filter: "audioonly" }
    )
    .on("end", async () => {
      if (bot.servers[message.guild.id].queue[0])
        await bot.servers[message.guild.id].queue.shift();
      if (bot.servers[message.guild.id].queue[0]) {
        bot.play(ytdl, message);
        let channel = message.guild.channels.get(
          bot.servers[message.guild.id].channel
        );
        let videoinfo = await ytdl.getInfo(
          `https://www.youtube.com/watch?v=${bot.servers[message.guild.id].queue[0].url}`
        );
        channel.send(
          new Discord.RichEmbed()
            .setColor("#8F00FF")
            .setTitle("🎵 Музыка")
            .addField("Сейчас играет: ", `**${videoinfo.title}**`, true)
            .addField(
              "Трек поставил:",
              `**${bot.servers[message.guild.id].queue[0].author}**`,
              true
            )
        );
      } else {
        await message.member.voiceChannel.leave();
      }
    });
};

fs.readdir("./commands/.", (err, files) => {
  if (err) bot.logsErr();

  let jsfiles = files.filter(f => f.split(".").pop() === "js");
  console.log(`Загружено ${jsfiles.length} комманд`);

  jsfiles.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    bot.commands.set(props.help.name, props);
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
      bot.aliases.set(alias, props.help.name);
    });
  });
});
  .then(async connections => {
    let usersRep, localeRep, clansRep, guildsRep;
    for (let i = 0; i < connections.length; i++) {
      if (connections[i].name == "Users")
        usersRep = connections[i].getRepository("Users");
      if (connections[i].name == "Locale")
        localeRep = connections[i].getRepository("Locale");
      if (connections[i].name == "Guilds")
        guildsRep = connections[i].getRepository("Guilds");
      if (connections[i].name == "Clans")
        clansRep = connections[i].getRepository("Clans");
    }
      (bot.usersRep = users),
      (bot.clansRep = clans),
      (bot.guildsRep = guilds),
      (bot.localeRep = locale);
    global.usersRep = usersRep;

    bot.on("ready", async () => {
      console.log(`${bot.user.username} Готов к работе!`);
      let statuses = [
        `!help`,
        `${bot.guilds.size} серверов`,
        `${bot.users.size} участников`,
        `Bot by END`
      ];
      let acitvestatus = statuses[Math.floor(Math.random() * statuses.length)];
      let shtyka = process.openStdin();
      shtyka.addListener("data", r => {
        let x = r
          .toString()
          .trim()
          .split(/ +/g);
        bot.channels.get("538659773864738816").send(x.join(" "));
      });
      setInterval(function() {
        bot.user.setPresence({
          game: {
            name: acitvestatus,
            status: "online",
            type: "STREAMING",
            url: "https://www.youtube.com/channel/UC-r7FefpKluK-rlwaWlQFOw"
          }
        });
        bot.user.setPresence({
          activity: { name: acitvestatus },
          status: "online"
        });
        //dbl.postStats(bot.guilds.size);
      }, 15 * 1000);
      if (linked === true)
        bot.generateInvite(["ADMINISTRATOR"]).then(link => {
          console.log(link);
        });
      let banint = setInterval(() => {
        fs.writeFile("./bans.json", JSON.stringify(bans, null, 4), err => {
          if (err) throw err;
        });
        fs.writeFile("./mutes.json", JSON.stringify(mutes, null, 4), err => {
          if (err) throw err;
        });
        fs.writeFile(
          "./voicemutes.json",
          JSON.stringify(voiceMutes, null, 4),
          err => {
            if (err) throw err;
          }
        );
      }, 4000);
      let checkban = setInterval(async () => {
        for (let i in bot.bans) {
          let splited = i.split("_");
          let time = bot.bans[i].time;
          if (Date.now() >= time) {
            let guildid = splited[1];
            let guild = bot.guilds.get(guildid);
            let member = await bot.fetchUser(splited[0]);
            guild.unban(member).catch(e => {
              console.log(e);
            });

            delete bot.bans[i];
          }
        }
        for (let i in bot.mutes) {
          let splited = i.split("_");
          let time = bot.mutes[i].time;
          if (Date.now() >= time) {
            let guildid = splited[1];
            let guild = bot.guilds.get(guildid);
            let guildDb = await bot.guildsRep.findOne({ guildid: guild.id });
            let role = guild.roles.get(guildDb.muterole);
            if (role) {
              let guildMember = guild.members.get(splited[0]);
              if (guildMember.roles.has(role.id)) {
                guildMember.removeRole(role);
              }
            }

            delete bot.mutes[i];
          }
        }
        for (let i in bot.voiceMutes) {
          let splited = i.split("_");
          let time = bot.voiceMutes[i].time;
          if (Date.now() >= time) {
            let guildid = splited[1];
            let guild = bot.guilds.get(guildid);
            let guildDb = await bot.guildsRep.findOne({ guildid: guild.id });
            let role = guild.roles.get(guildDb.voicemute);
            if (role) {
              let guildMember = guild.members.get(splited[0]);
              guildMember.setMute(false, "Время блокировки истекло");
              if (guildMember.roles.has(role.id)) {
                guildMember.removeRole(role);
              }
            }

            delete bot.voiceMutes[i];
          }
        }
      }, 5000);
    });
    const marks = {
      "🔰": {
        name: "Новичок",
        description: "Начать пользоваться ботом"
      },
      "🐵": {
        name: "Обезьяна",
        description: "Заработать первую 1.000 бананов"
      },
      "💵": {
        name: "Rich day",
        description: "Заработать 100.000 бананов"
      },
      "🍌": {
        name: "Банановый магнат",
        description: "Заработать 50.000.000 бананов"
      },
      "📘": {
        name: "Ученик",
        description: "Получить 5 уровень"
      },
      "👨‍🎓": {
        name: "Студент",
        description: "Получить 25 уровень"
      },
      "👨‍🔬": {
        name: "Ученый",
        description: "Получить 100 уровень"
      },
      "🤖": {
        name: "Нейросеть",
        description: "Получить 499 уровень"
      },
      "🤡": {
        name: "Дени$ка",
        description: "Получить 1001 уровень"
      },
      "🔨": {
        name: "Злодей",
        description: "Забанить пользователя"
      },
      "📈": {
        name: "Ого!",
        description: "Получить бонус"
      },
      "🆘": {
        name: "Тестер",
        description: "Отправить баг в службу поддержки"
      },
      "💍": {
        name: "Поднял бабла!",
        description: "Выиграть 100.000 в казино"
      },
      "👑": {
        name: "Ограбил казино",
        description: "Выиграть 5.000.000 в казино"
      },
      "👨‍💼": {
        name: "Везунчик",
        description: "Выиграть 1.000.000.000 в казино"
      },
      "🧙‍♀️": {
        name: "Вместе - Сила!",
        description: "Создать/войти в клан"
      },
      "🔑": {
        name: "Добро пожаловать",
        description: "Использовать команду invite"
      },
      "💑": {
        name: "Вместе навсегда",
        description: "Найти себе партнера"
      },
      "🤬": {
        name: "Замолчи!",
        description: "Запретить пользователю писать сообщения"
      },
      "👼": {
        name: "Щедрая душа ",
        description: "Передать 1.000.000 другому пользователю"
      },
      "⁉️": {
        name: "Лагает?",
        description: "Использовать пинг"
      },
      "⚜️": {
        name: "Нарушитель!",
        description: "Отправить жалобу на пользователя"
      },
      "😳": {
        name: "Чтоп сто?",
        description: "Посмотреть на трапов"
      },
      "⏩": {
        name: "Фигня",
        description: "Пропустить песню"
      },
      "👷": {
        name: "Работяга",
        description: "Поработать на работе"
      }
    };
    bot.marks = marks;
    async function addMark(condition, mark, user, message) {
      if (condition && user.marks.includes(mark) == false) {
        user.marks += `${mark} `;
        message.channel.send(
          new Discord.RichEmbed()
            .setColor("RANDOM")
            .addField(
              `${message.author.tag} Достижение разблокировано!`,
              ` ** __${mark} ${marks[mark].name}__ ${marks[mark].description} ** `
            )
        );
      }
    }
    bot.addMark = addMark;

    bot.on("message", async message => {
      if (message.author.bot) return;
      if (message.channel.type == "dm") return;
      console.log(
        `${message.guild.name} | ${message.channel.name} | ${message.author.tag} | ${message.content}`
      );
      let user = await usersRep.findOne({ userid: message.author.id });
      if (!user) {
        user = { userid: message.author.id };
        if (acclogs === true)
          console.log(`Создан аккаунт: ${message.author.tag}`);
        await usersRep.save(user);
      }
      let localeuser = await localeRep.findOne({
        userid: message.author.id,
        guildid: message.guild.id
      });
      let guild = await guildsRep.findOne({ guildid: message.guild.id });
      if (!localeuser) {
        localeuser = { userid: message.author.id, guildid: message.guild.id };
        if (acclogs === true)
          console.log(`Создан локальный аккаунт: ${message.author.tag}`);
        await localeRep.save(localeuser);
      }

      if (!guild) {
        guild = { guildid: message.guild.id };
        if (acclogs === true)
          console.log(`Добавлен сервер: ${message.guild.name}`);
        await guildsRep.save(guild);
      }
      let clan =
        user.clanid == -1 ? null : await clansRep.findOne({ id: user.clanid });
      localeuser.coins++;
      user.xp++;
      if (user.xp >= user.lvl * 8) {
        user.lvl++;
        user.xp = 0;
      }
      const prefix = guild.prefix;
      bot.prefix = prefix;
      //Marks
      addMark(user.coins >= 1000, "🐵", user, message);
      addMark(user.coins >= 100000, "💵", user, message);
      addMark(user.coins >= 50000000, "🍌", user, message);
      addMark(user.lvl >= 5, "📘", user, message);
      addMark(user.lvl >= 25, "👨‍🎓", user, message);
      addMark(user.lvl >= 100, "👨‍🔬", user, message);
      addMark(user.lvl >= 499, "🤖", user, message);
      addMark(user.lvl >= 1001, "🤡", user, message);
      addMark(user.clanid != -1, "🧙‍♀️", user, message);
      addMark(user.partner != 0, "💑", user, message);
      if (!message.content.includes("accept")) usersRep.save(user);
      localeRep.save(localeuser);
      guildsRep.save(guild);
      bot.dbUser = user;
      bot.localeUser = localeuser;
      bot.guild = guild;
      bot.clan = clan;
      message.guild.roles;
      //Команды
      if (guild.blockinvites == 1) {
        // Антиреклама
        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
          if (
            message.content.includes("discord.gg/" || "discordapp.com/invite/")
          ) {
            message.delete();
            if (guild.muterole != 0) {
              let muterole = message.guild.roles.get(bot.guild.muterole);
              if (muterole) {
                message.member.addRole(muterole);
                //if!logs
                message.guild.owner.send(
                  `Подозрительное сообщение от: ${message.author}\n\n${message.content}`
                );
              }
            }
          }
        }
      }
      if (message.content.startsWith("!"))
        if (guild.cmdchannel != 0) {
          //cmdchannel
          if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            if (message.channel.id != guild.cmdchannel) {
              let channel = message.guild.channels.get(guild.cmdchannel);
              if (channel) {
                let cmdEmbed = new Discord.RichEmbed()
                  .setColor("9640FF")
                  .addField(
                    message.author.tag,
                    `** Использование команд только в канале ${channel} ** `
                  );
                return message.channel.send(cmdEmbed);
              } else {
                guild.cmdchannel = "0";
              }
            }
          }
        }

      async function clanTrigger() {
        if (!clan) {
          return;
        }
        let chance = Math.floor(Math.random() * 100) + 1; // returns a random integer from 1 to 10
        if (chance <= 90) return;
        if (clan.xp >= clan.level * 1000) {
          clan.level += 1;
          clan.xp = 0;
          await message.react("🤞");
        }
        if (chance >= 95) {
          let cCoins = Math.floor(Math.random() * (10 - 0 + 1) + 0); //Ролит деньги клана
          clan.coins += cCoins;
        }

        await bot.clansRep.save(clan);
      }
      message.guild.defaultRole;
      await clanTrigger();
      let messageArray = message.content.split(" ");
      let command = messageArray[0].toLowerCase();
      let args = messageArray.slice(1);
      bot.command = command;
      if (!message.content.startsWith(prefix)) return;
      let cmd =
        bot.commands.get(command.slice(prefix.length)) ||
        bot.commands.get(bot.aliases.get(command.slice(prefix.length)));
      if (cmd && cmd.help.owneronly && !owners.includes(message.author.id))
        return message.react("❌");
      if (cmd) cmd.run(bot, message, args);
    });
    bot.on("guildMemberAdd", async member => {
      if (member.guild.me.hasPermission("MANAGE_ROLES")) {
        // Авто роль
        let guild = await guildsRep.findOne({ guildid: member.guild.id });
        if (guild.autorole) {
          // Выдача авто роли
          let role = await member.guild.roles.get(guild.autorole);
          if (role) {
            member.addRole(role);
          } else {
            guild.autorole = 0;
            guildsRep.save(guild);
          }
        }
      }

      if (member.guild.me.hasPermission("MANAGE_CHANNELS")) {
        let guild = await guildsRep.findOne({ guildid: member.guild.id });
        if (guild.botcount != 0) {
          let channel = member.guild.channels.get(guild.botcount);
          if (channel) {
            let channelname = channel.name.replace(/[0-9]/g, "");
            channel.setName(
              `${channelname}${
                member.guild.members.filter(m => m.user.bot).size
              }`
            );
          } else {
            guild.botcount = 0;
            guildsRep.save(guild);
          }
        }
        if (guild.userscount != 0) {
          let channel = member.guild.channels.get(guild.userscount);
          if (channel) {
            let channelname = channel.name.replace(/[0-9]/g, "");
            console.log(channelname);
            channel.setName(`${channelname}${member.guild.memberCount}`);
          } else {
            guild.userscount = 0;
            guildsRep.save(guild);
          }
        }
        if (guildsRep.joinleave != 0) {
          let channel = member.guild.channels.get(guild.joinleave);

          if (channel) {
            let leaveEmbed = new Discord.RichEmbed()
              .setColor("55E82A")
              .setTitle(
                `${member.user.tag} добро пожаловать на ${member.guild.name}`
              )
              .setFooter(`${member.guild.members.size} участников`);
            сhannel.send(leaveEmbed);
          } else {
            guild.joinleave = 0;
            guildsRep.save(guild);
          }
        }
      }
    });
    bot.on("guildMemberRemove", async member => {
      if (member.guild.me.hasPermission("MANAGE_CHANNELS")) {
        let guild = await guildsRep.findOne({ guildid: member.guild.id });
        if (guild.botcount != 0) {
          let channel = member.guild.channels.get(guild.botcount);
          if (channel) {
            let channelname = channel.name.replace(/[0-9]/g, "");
            channel.setName(
              `${channelname} ${
                member.guild.members.filter(m => m.user.bot).size
              } `
            );
          } else {
            guild.botcount = 0;
            guildsRep.save(guild);
          }
        }
        if (guild.userscount != 0) {
          let channel = await member.guild.channels.get(guild.userscount);
          if (channel) {
            let channelname = channel.name.replace(/[0-9]/g, "");
            channel.setName(`${channelname} ${member.guild.memberCount} `);
          } else {
            guild.userscount = 0;
            guildsRep.save(guild);
          }
        }
        if (guildsRep.joinleave != 0) {
          let channel = member.guild.channels.get(guild.joinleave);
          if (channel) {
            let leaveEmbed = new Discord.RichEmbed()
              .setColor("E82F07")
              .setTitle(`${member.user.tag} покинул ${member.guild.name}`)
              .setFooter(`${member.guild.members.size} участников`);
            channel.send(leaveEmbed);
          } else {
            guild.joinleave = 0;
            guildsRep.save(guild);
          }
        }
      }
    });
    bot.on("voiceStateUpdate", async (oldMember, newMember) => {
      let newUserChannel = newMember.voiceChannel;
      let oldUserChannel = oldMember.voiceChannel;

      let guildid = newMember.guild.id || oldMember.guild.id;
      let guild = await guildsRep.findOne({ guildid });

      if (guild.voiceonline != "0") {
        let channel = bot.channels.get(guild.voiceonline);
        if (channel) {
          let channelname = channel.name.replace(/[0-9]/g, "");
          if (newUserChannel && !oldUserChannel) {
            channel
              .setName(
                `${channelname} ${
                  newMember.guild.members.filter(m => m.voiceChannel).size
                } `
              )
              .catch(err => err);
          }
          if (!newUserChannel && oldUserChannel) {
            channel
              .setName(
                `${channelname} ${
                  newMember.guild.members.filter(m => m.voiceChannel).size
                } `
              )
              .catch(err => err);
          }
        }
      }

      if (newMember.voiceChannelID == guild.privateChannel) {
        let parent = newMember.voiceChannel.parent;
        await newMember.guild
          .createChannel(`${newMember.user.username} \`s channel`, {
            type: "voice",
            parent: parent
          })
          .then(async channel => {
            await newMember.setVoiceChannel(channel).catch(error => error);
            await channel.setUserLimit(5).catch(error => error);
            await channel.overwritePermissions(newMember, {
              MANAGE_CHANNELS: true
            });
          });
      }
      let createChannel = bot.channels.get(guild.privateChannel);
      if (!createChannel) {
        guildid.privateChannel = "0";
        return await bot.guildsRep.save(guild);
      }
      if (oldMember.voiceChannel)
        if (
          oldMember.voiceChannel.parentID == createChannel.parentID &&
          oldMember.voiceChannel.members.size == 0 &&
          oldMember.voiceChannel != createChannel
        )
          await oldMember.voiceChannel.delete();
    });
  });
bot.login(process.env.TOKEN).catch(err => {
  if (err.message.toLowerCase().includes("incorrect login"))
    console.log(
      `\nОшибка: Токен бота указан не правильно!\n\nУкажите корректный токен вашего бота в файле .env\nТокен не должен содержать пробелов после '='\nПример: TOKEN =abc43389u34fjfakdsfj4fj`
    );
});
bot.on("message", async message => {
  if (message.channel.id == "702228746031071282") {
    message.react("✅");
    message.react("✖");
  }
});
bot.on("message", async message => {
  if (message.channel.id == "692049239005724752") {
    message.react("👍");
    message.react("👎");
  }
});
bot.on("message", async message => {
  if (message.channel.id == "692049279149277184") {
    message.react("👍");
    message.react("👎");
  }
});
bot.on("message", async message => {
  if (message.channel.id == "699018551054434324") {
    message.react("👍");
    message.react("👎");
  }
});

bot.on("message", async message => {
  if (message.author.bot == true) return;
  { if(bot.user.userid = message.member.id)
    if (message.author.id == bot.users.userid && bot.user.users.lvl == 1) {
      message.member.addRole("359782218606051350");
    }
    if (message.author.id == bot.user.users.userid && bot.UsersEntity.users.lvl == 2) {
      message.member.addRole("675125422001750049");
    }
    if (message.author.id == bot.UsersEntity.users.userid && bot.UsersEntity.users.lvl == 3) {
      message.member.addRole("675125491023347722");
    }
    if (message.author.id == bot.UsersEntity.users.userid && bot.UsersEntity.users.lvl == 4) {
      message.member.addRole("675125566814289960");
    }
    if (message.author.id == bot.UsersEntity.users.userid && bot.UsersEntity.users.lvl == 5) {
      message.member.addRole("675125668710842423");
    }
    if (message.author.id == bot.UsersEntity.users.userid && bot.UsersEntity.users.lvl == 6) {
      message.member.addRole("675130936727175180");
    }
    if (message.author.id == bot.UsersEntity.users.userid && bot.UsersEntity.users.lvl == 7) {
      message.member.addRole("675131069166780436");
    }
    if (message.author.id == bot.UsersEntity.users.userid && bot.UsersEntity.users.lvl == 8) {
      message.member.addRole("675131133851336715");
    }
    if (message.author.id == bot.UsersEntity.users.userid && bot.UsersEntity.users.lvl == 9) {
      message.member.addRole("675131192307220482");
    }
    if (message.author.id == bot.UsersEntity.users.userid && bot.UsersEntity.users.lvl == 10) {
      message.member.addRole("675131236716642314");
    }
    if (message.author.id == bot.UsersEntity.users.userid && bot.UsersEntity.users.lvl == 11) {
      message.member.addRole("675131279917711360");
    }
    if (message.author.id == bot.UsersEntity.users.userid && bot.UsersEntity.users.lvl == 12) {
      message.member.addRole("675131318689857546");
    }
    if (message.author.id == bot.UsersEntity.users.userid && bot.UsersEntity.users.lvl == 13) {
      message.member.addRole("675131367557824512");
    }
    if (message.author.id == bot.UsersEntity.users.userid && bot.UsersEntity.users.lvl == 14) {
      message.member.addRole("675131548583985192");
    }
    if (message.author.id == bot.UsersEntity.users.userid && bot.UsersEntity.users.lvl == 15) {
      message.member.addRole("675144821647736843");
    }
    if (message.author.id == bot.UsersEntity.users.userid && bot.UsersEntity.users.lvl == 16) {
      message.member.addRole("675322573382483968");
    }
    if (message.author.id == bot.UsersEntity.users.userid && bot.UsersEntity.users.lvl == 17) {
      message.member.addRole("675322680093966376");
    }
    if (message.author.id == bot.UsersEntity.users.userid && bot.UsersEntity.users.lvl == 18) {
      message.member.addRole("675322784179552256");
    }
    if (message.author.id == bot.UsersEntity.users.userid && bot.UsersEntity.users.lvl == 19) {
      message.member.addRole("675322816886865923");
    }
    if (message.author.id == bot.users.userid && bot.UsersEntity.users.lvl == 20) {
      message.member.addRole("675322848969097216");
    }
    if (message.author.id == bot.UsersEntity.users.userid && bot.UsersEntity.users.lvl == 21) {
      message.member.addRole("675322899036635136");
    }
    if (message.author.id == bot.UsersEntity.users.userid && bot.UsersEntity.users.lvl == 22) {
      message.member.addRole("675322945840873472");
    }
    if (message.author.id == bot.UsersEntity.users.userid && bot.UsersEntity.users.lvl == 23) {
      message.member.addRole("675322986974412801");
    }
    if (message.author.id == bot.UsersEntity.users.userid && bot.UsersEntity.users.lvl == 24) {
      message.member.addRole("675323035716288522");
    }
    if (message.author.id == bot.UsersEntity.users.userid && bot.UsersEntity.users.lvl == 25) {
      message.member.addRole("675323198979702785");
    }
    if (message.author.id == bot.UsersEntity.users.userid && bot.UsersEntity.users.lvl == 26) {
      message.member.addRole("675324458373742632");
    }
    if (message.author.id == bot.UsersEntity.users.userid && bot.UsersEntity.users.lvl == 27) {
      message.member.addRole("675324530247598080");
    }
    if (message.author.id == bot.UsersEntity.users.userid && bot.UsersEntity.users.lvl == 28) {
      message.member.addRole("675324563244187677");
    }
    if (message.author.id == bot.UsersEntity.users.userid && bot.UsersEntity.users.lvl == 29)
     {
      message.member.addRole("675323298858663937");}
    {
     if (message.author.id == bot.UsersEntity.users.userid && bot.UsersEntity.users.lvl == 30 )
     {
      message.member.addRole("685893262820900869");}
    }}

  })
