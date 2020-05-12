const guildchema = mongoose.Schema({
    guildID: String,
    ownerID:{ type: Array, default: "[359678229096955904]" },
    Moderation:{
     Warns:{
       muteWarns:{type:Number,default:2},
       kickWarns:{type:Number,default:4},
       banWarns:{type:Number,default:5},
     },
     color:{type: String, default: "#daa520" },
     cmdchannel:{ type: String, default: "0" },
     prefix: { type: String, default: "!" },
     linked:{type: Boolean,default: true},
     logs:{type: Boolean,default: true},
     blockinvites:{type:String,default:1},
     muteRole:{type:String,default:1}
   },
    Economy:{
      upXP:{type:Number,default:100},
      bonus:{type:Number,default:50},
      timely:{type:Number,default:1440},
      clanPrice:{type: Number, default: 15000 },
      money:{type: Number, default:3},
      xp:{type: Number, default:5},
    },
    Wmessage:{
     status: {type:Boolean, default: false},
     Channel:{type: String,default: null},
     title :{type: String,default: null},
     description:{type: String,default: null},
   },
    Lmessage:{
     status: {type:Boolean, default: false},
     Channel:{type: String,default: null},
     title :{type: String,default: null},
     description:{type: String,default: null},
}})

module.exports = mongoose.model("Guild", guildchema)
