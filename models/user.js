const userSchema = mongoose.Schema({
    guildID: String,
    rep:{ type: Number, default: 0 },
    clanID: { type: Number, default: -1 },
    userID: String,
    money: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    xp: {type:Number,default:0 },
    messages: { type: Number, default: 0 },
    warn:{type: Number,default:0},
    bonustime:{type: Number,default:0},
    sended:{type: String,default:0},
    senders:{type: String,default:0},
    partner:{type: String,default:0},
    Achievements:{type:String,default:":beginner:"},
    Timelyes:{
    _rep:{type: Number,default:0},
    _muteTime:{type: Number,default:0},
    _timely:{ type: Number, default: 0 }
  }
});
module.exports = mongoose.model("User", userSchema)
