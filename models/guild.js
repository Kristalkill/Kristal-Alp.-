const guildchema = mongoose.Schema({
    guildID: String,
    ownerID:String,
    Moderation:{
     prefix: { type: String, default: "k!" },
     muterole:{ type: String, default: "0"},
     language:{type:String,default: 'en'}
   },
    Economy:{
      shop:{type:Map,default:{}},
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
    Wchannel:{type:String},
    Lchannel:{type:String},
})

module.exports = mongoose.model("Guild", guildchema)
