const userSchema = mongoose.Schema({
    guildID: String,
    rep:{ type: Number, default: 0 },
    icon:String,
    clanID: { type: Number, default: -1 },
    userID: String,
    money: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    xp: {type:Number,default:0 },
    messages: { type: Number, default: 0 },
    warn:{type: Number,default:0},
    sended:{type: String,default:0},
    senders:{type: String,default:0},
    partner:{type: String,default:0},
    Achievements:[],
    Timelyes:{
    _premium:Number,
    _rep:Number,
    _timely:Number
  }
});
module.exports = mongoose.model("User", userSchema)
