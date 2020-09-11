const mongoose = require("mongoose");
  module.exports = class MongoDB{
    constructor(Main){
        this.Main = Main;
        this.Guild = mongoose.model("Guild", mongoose.Schema({
          guildID: String,
          ownerID: String,
          Moderation: {
            prefix: { type: String, default: "k!" },
            muterole: { type: String, default: "0" },
            language: { type: String, default: 'en' }
          },
          Economy: {
            shop: { type: Map, default: {} },
            Partner: {
              price: { type: Number, default: 5000 },
              level: { type: Number, default: 5 },
            },
            upXP: { type: Number, default: 100 },
            bonus: { type: Number, default: 50 },
            money: { type: Number, default: 3 },
            xp: { type: Number, default: 5 },
          }
      }));
        this.Block = mongoose.model("Block", mongoose.Schema({
          id: String,
          reason: String,
        }));
        this.User = mongoose.model("User", mongoose.Schema({
          guildID: String,
          rep:{ type: Number, default: 0 },
          userID: String,
          money: { type: Number, default: 0 },
          level: { type: Number, default: 1 },
          xp: {type:Number,default:0 },
          messages: { type: Number, default: 0 },
          warn:{type: Number,default:0},
          Achievements:[],
          Timelyes:{
          _premium:{type:Number,default:0},
          _rep:{type:Number,default:0 },
          _timely:{type:Number,default:0}
        }
      }));
        this.Mute = mongoose.model("mute",mongoose.Schema({
          id: String,
          guildID:String,
          reason: String,
          time:String,
          role:String,
          channel:String
        }));
        this.Giveaway = mongoose.model("giveaway",mongoose.Schema({
          guildID:String,
          time:String,
          prize:String,
          winners:String,
          messageID:String,
          channel:String,
          users:Array
          }));
        this.cooldowns = new Map(); 
    }
    async connect(){
      mongoose.connect(process.env.dataURL, { useNewUrlParser: true, useUnifiedTopology: true });
      mongoose.connection.on('connected',()=>{
        console.log('[✅DataBase] Connected!')
      })
    }
}