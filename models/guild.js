const guildchema = mongoose.Schema({
    guildID: String,
    ownerID: String,
    prefix: { type: String, default: "!" },
    linked:{type: Boolean,default: true},
    logs:{type: Boolean,default: true},
    clanPrice:{ type: Number, default: 15000 },
    bonusInterval:{type:String,default: 1440},
    bonus:{type:String,default:50},
    RandomizeMaxXp:{type:String,default:5},
    RandomizeMinXp:{type:String,default:1},
    RandomizeMaxMoney:{type:String,default:3},
    RandomizeMinMoney:{type:String,default:1},
    upXP:{type:String,default:100}
});
module.exports = mongoose.model("Guild", guildchema)
