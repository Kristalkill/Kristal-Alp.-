const userSchema = mongoose.Schema({
    guildID: String,
    clanID: { type: Number, default: -1 },
    userID: String,
    money: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    xp: { type: Number, default: 0 },
    messages: { type: Number, default: 0 },
    warn:{type: Number,default:0},
    bonustime:String,
    partner:{type: String},
    Achievements:{type:String,default:":beginner:"},
    _muteTime:Number,
    _timely:{ type: Number, default: 0 }
});
module.exports = mongoose.model("User", userSchema)
