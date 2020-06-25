const guildchema = mongoose.Schema({
    guildID: String,
    ownerID:{ type: Array, default: "[359678229096955904]" },
    Logs:{
      Invite:String,
      Ban:String,
      Message:String,
      Kick:String,
      Mute:String,
      
    },
    Moderation:{
     prefix: { type: String, default: "k!" },
   },
    Economy:{
      Partner:{
         price:{type:Number,default:5000},
         level:{type:Number,default:5},
      },
      upXP:{type:Number,default:100},
      bonus:{type:Number,default:50},
      clanPrice:{type: Number, default: 15000 },
      money:{type: Number, default:3},
      xp:{type: Number, default:5},
    },
    Wmessage:{type:String},
    Lstatus:{type:String},
})

module.exports = mongoose.model("Guild", guildchema)
