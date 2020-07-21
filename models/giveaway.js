const giveawayShema = mongoose.Schema({
guildID:String,
time:String,
prize:String,
winners:String,
messageID:String
});
module.exports = mongoose.model("giveaway", giveawayShema)