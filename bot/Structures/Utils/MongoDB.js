/* eslint-disable no-undef */
const {
  model,
  Schema,
  connect,
  connection
} = require('mongoose');

module.exports = class MongoDB {
  constructor(Main) {
    this.Main = Main;
    this.Guild = model(
      'Guild',
      Schema({
        guildID: String,
        ownerID: String,
        Moderation: {
          auto: {
            type: Boolean,
            default: false
          },
          prefix: {
            type: String,
            default: 'k!'
          },
          muterole: {
            type: String,
            default: '0'
          },
          language: {
            type: String,
            default: 'en'
          },
        },
        Economy: {
          shop: {
            type: Map,
            default: {}
          },
          upXP: {
            type: Number,
            default: 100
          },
          bonus: {
            type: Number,
            default: 50
          },
          money: {
            type: Number,
            default: 3
          },
          xp: {
            type: Number,
            default: 5
          },
        },
        options: {
          boxes: false,
        },
      })
    );
    this.Block = model(
      'Block',
      Schema({
        id: String,
        reason: String,
      })
    );
    this.User = model(
      'User',
      Schema({
        guildID: String,
        box: {
          С: {
            type: Number,
            default: 0
          },
          U: {
            type: Number,
            default: 0
          },
          R: {
            type: Number,
            default: 0
          },
          E: {
            type: Number,
            default: 0
          },
          L: {
            type: Number,
            default: 0
          },
        },
        rep: {
          type: Number,
          default: 0
        },
        userID: String,
        money: {
          type: Number,
          default: 0
        },
        level: {
          type: Number,
          default: 1
        },
        xp: {
          type: Number,
          default: 0
        },
        messages: {
          type: Number,
          default: 0
        },
        warn: {
          type: Number,
          default: 0
        },
        Achievements: [],
        Timelyes: {
          _premium: {
            type: Number,
            default: 0
          },
          _rep: {
            type: Number,
            default: 0
          },
          _timely: {
            type: Number,
            default: 0
          },
        },
      })
    );
    this.Mute = model(
      'mute',
      Schema({
        id: String,
        guildID: String,
        reason: String,
        time: String,
        role: String,
        channel: String,
      })
    );
    this.Giveaway = model(
      'giveaway',
      Schema({
        guildID: String,
        time: String,
        prize: String,
        winners: String,
        messageID: String,
        channel: String,
        users: Array,
      })
    );
    this.cooldowns = new Map();
    this.boxescoldown = new Set();
  }

  async connect() {
    await connect(process.env.dataURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    connection.on('connected', () => {
      console.log('[✅DataBase] Connected!');
    });
  }
};