const guildchema = mongoose.Schema({
    guildID: String,
    ownerID: String,
    prefix: { type: String, default: "!" },
    linked:{type: Boolean,default: true},
    logs:{type: Boolean,default: true},
    clanPrice:{ type: Number, default: 15000 },
    bonusInterval:{type:Number,default: 1440},
    bonus:{type:Number,default:50},
    RandomizeMaxMoney:{type:String,default:4},
    RandomizeMinMoney:{type:String,default:1},
    RandomizeMaxXp:{type:String,default:5},
    RandomizeMinXp:{type:String,default:1},
    upXP:{type:Number,default:100}
});
module.exports = mongoose.model("Guild", guildchema)
