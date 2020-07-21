const giveawayShema = mongoose.Schema({
guildID:String,
time:String,
prize:String,
winners:String
});
module.exports = mongoose.model("giveaway", giveawayShema)