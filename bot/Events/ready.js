const Discord = require('discord.js');
const Event = require('../Structures/Construction/Event');

module.exports = class extends Event {
  constructor(...args) {
    super(...args, {
      once: true,
    });
  }

  async run() {
    console.log(`[✅Bot] ${this.Main.user.tag} Запущен!`);
    const GiveAway = new Discord.MessageEmbed().setTitle('🎉**Giveaway** 🎉');

    await this.Main.user.setPresence({
      activity: {
        name: 'k!help'
      },
      status: 'online',
    });
    setInterval(async () => {
      try {
        let res = await this.Main.db.Mute;
        if (res) {
          for (const mute of await res.find()) {
            if (mute.time === false) continue;
            const guild = this.Main.guilds.cache.get(mute.guildID);
            if (!guild) continue;
            const Data =  await this.Main.db.Guild.findOne({
              guildID: mute.guildID,
            });
            const role = guild.roles.cache.get(Data.Moderation.muterole);
            const user = guild.members.cache.get(mute.id);
            if (
              !guild.members.cache.get(mute.id) &&
              mute.time !== null &&
              mute.time <= Date.now()
            )
              await res.deleteOne({
                guild: mute.guildID,
                id: mute.id
              });
            if (!guild.members.cache.get(mute.id)) continue;
            if (!role)  await res.deleteOne({
              guild: mute.guildID,
              id: mute.id
            });
            if (mute.time === null) {
              if (
                !guild.members.cache
                .get(mute.id)
                .roles.cache.has(Data.Moderation.muterole)
              )
                guild.members.cache
                .get(mute.id)
                .roles.add(Data.Moderation.muterole);
            } else {
              if (mute.time >= Date.now()) {
                if (!user) continue;
                if (!user.roles.cache.has(Data.Moderation.muterole))
                  user.roles.add(Data.Moderation.muterole);
              } else {
                const language = require(`./../languages/${
                    Data.Moderation.language || 'en'
                }.json`);
                await this.Main.db.Mute.deleteOne({
                  guildID: mute.guildID,
                  id: mute.id,
                  reason: mute.reason,
                  time: mute.time,
                  channel: mute.channel,
                });
                await user.roles.remove(Data.Moderation.muterole);
                if (
                    guild.channels.cache.get(mute.channel) &&
                    guild.members.cache.get(mute.id) &&
                    guild.members.cache
                        .get(mute.id)
                        .roles.cache.has(Data.Moderation.muterole)
                )
                  guild.channels.cache
                      .get(mute.channel)
                      .send(
                          this.Main.embeds.OKEmbed.setDescription(
                              `${guild.members.cache.get(mute.id)} ${
                                  language.ready.unmute
                              }`
                          )
                      );
                if (user && user.roles.cache.has(Data.Moderation.muterole))
                  user.send(
                      this.Main.embeds.OKEmbed.setDescription(
                          `${user} ${language.ready.unmute}`
                      )
                  );
              }
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    }, 3000);
    setInterval(async () => {
      try {
        let res = await this.Main.db.Giveaway;
        if (res) {
          for (const Giveaway of await res.find()) {
            const guild = this.Main.guilds.cache.get(Giveaway.guildID);
            if (!guild) continue;
            if (
              (!guild.channels.cache.get(Giveaway.channel)) ||
              (!guild.channels.cache
                  .get(Giveaway.channel)
                  .messages.fetch(Giveaway.messageID))
              )
              await Giveaway.deleteOne({
                guildID: Giveaway.guildID,
                time: Giveaway.time,
                prize: Giveaway.prize,
                winners: Giveaway.winners,
                messageID: Giveaway.messageID,
                channel: Giveaway.channel,
              });
            if (Giveaway.time >= Date.now()) {
              Giveaway.users = await guild.channels.cache
                .get(Giveaway.channel)
                .messages.fetch(Giveaway.messageID)
                .then((v) =>
                  Array.from(
                    v.reactions.cache
                    .get('🎉')
                    .users.cache.filter(
                      (user) => user.id !== this.Main.user.id && !user.bot
                    )
                    .keys()
                  )
                );
              Giveaway.save();
            } else {
              const Data = await this.Main.db.Guild.findOne({
                guildID: Giveaway.guildID,
              });
              const language = require(`./../languages/${
                Data.Moderation.language || 'en'
              }.json`);
              if (Giveaway.users.length) {
                let random = Giveaway.users
                  .shuffle()
                  .slice(0, Giveaway.winners);
                guild.channels.cache
                  .get(Giveaway.channel)
                  .send(
                    GiveAway.setDescription(
                      `${language.ready.winners} ${random
                        .map((a) => guild.members.cache.get(a))
                        .join(', ')}`
                    )
                  );
              } else {
                guild.channels.cache
                  .get(Giveaway.channel)
                  .send(GiveAway.setDescription(language.ready.nowinners));
              }
              await Giveaway.deleteOne({
                guildID: Giveaway.guildID,
                time: Giveaway.time,
                prize: Giveaway.prize,
                winners: Giveaway.winners,
                messageID: Giveaway.messageID,
                channel: Giveaway.channel,
              });
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    }, 15000);
  }
};